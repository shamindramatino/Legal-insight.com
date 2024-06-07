// Import necessary modules and components
import { db } from '@/db'; // Importing database module
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; // Importing authentication session function
import { TRPCError } from '@trpc/server'; // Importing TRPC error handling
import { privateProcedure, publicProcedure, router } from './trpc'; // Importing TRPC procedures and router
import { any, string, z } from 'zod'; // Importing zod schema validation
import { Input } from '@/components/ui/input'; // Importing UI components
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'; // Importing infinite query limit
import { absoluteUrl } from '@/lib/utils'; // Importing utility function for getting absolute URL
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe'; // Importing functions related to user subscription and Stripe integration
import { PLANS } from '@/config/stripe'; // Importing Stripe plans configuration

// Define appRouter with TRPC procedures
export const appRouter = router ({
  // Public procedure for handling authentication callback
  authCallback: publicProcedure.query( async () =>{
    const { getUser } = getKindeServerSession();
    const user = getUser();

    // Ensure user is authenticated
    if (!user.id || !user.email) 
      throw new TRPCError({ code:'UNAUTHORIZED' });

    // Check if the user exists in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    console.log(" dbUser", dbUser)

    // If user doesn't exist, create user in the database
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }

    return { success: true };
  }),

  // Private procedure to get user files
  getUserFiles: privateProcedure.query( async ({ ctx }) => {
    const { userId } = ctx;
    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),

  // Private procedure to create a Stripe session
  createStripeSession: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;
    const billingUrl = absoluteUrl("/dashboard/billing");
    console.log("const billingUrl", billingUrl);

    // Ensure user is authenticated
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Retrieve user from the database
    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    // If user doesn't exist, throw unauthorized error
    if (!dbUser) 
      throw new TRPCError({ code: "UNAUTHORIZED" });

    // Get user's subscription plan
    const subscriptionPlan = await getUserSubscriptionPlan();
    console.log ("Subscription Plan", subscriptionPlan);

    // If user is subscribed and has a Stripe customer ID, create a billing portal session
    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const StripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });

      return { url: StripeSession.url };
    }

    // If user is not subscribed or doesn't have a Stripe customer ID, create a checkout session
    const StripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    });

    return { url: StripeSession.url };
  }),

  // Private procedure to get file messages
  getFileMessages: privateProcedure.input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
      fileId: z.string(),
    })
  ).query(async({ ctx, input }) => {
    const { userId } = ctx;
    const { fileId, cursor } = input;
    const limit = input.limit ?? INFINITE_QUERY_LIMIT;

    // Find file in the database
    const file = await db.file.findFirst({
      where: {
        id: fileId,
        userId
      },
    });
    console.log("findFirst",file)

    // If file doesn't exist, throw not found error
    if (!file) 
      throw new TRPCError({ code: 'NOT_FOUND' });

    // Retrieve messages associated with the file
    const messages = await db.message.findMany({
      take: limit + 1,
      where: {
        fileId
      },
      orderBy: {
        createdAt: "desc"
      },
      cursor: cursor ? { id: cursor } : undefined,
      select: {
        id: true,
        isUserMessage: true,
        createdAt: true,
        text: true
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.id;
    }

    return {
      messages,
      nextCursor,
    };
  }),

  // Private procedure to get file upload status
  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      });
      console.log("f",file)

      if (!file) return { status: "PENDING" as const };
      return { status: file.UploadStatus };
    }),
  
  // Private procedure to get a file
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async({ ctx, input }) => {
      const { userId } = ctx;

      // Find file in the database
      const file = await db.file.findFirst({
        where: {
          Key: input.key,
          userId,
        },
      });
      console.log("const file", file)

      // If file doesn't exist, throw not found error
      if (!file) 
        throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  // Private procedure to delete a file
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async({ ctx, input }) => {
      const { userId } = ctx;

      // Find file in the database
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      // If file doesn't exist, throw not found error
      if (!file) 
        throw new TRPCError({ code: 'NOT_FOUND' });

      // Delete file from the database
      await db.file.delete({
        where: {
          id: input.id,
        },
      });

      return file;
    }),
});

// Export type for appRouter
export type AppRouter = typeof appRouter;

