
import MaxWidthWrapper from "@/components/MaxWidthWrapper"; // Importing MaxWidthWrapper component
import { buttonVariants } from "@/components/ui/button"; // Importing buttonVariants from button module
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Importing Tooltip components
import UpgradeButton from "@/components/UpgradeButton"; // Importing UpgradeButton component
import { PLANS } from "@/config/stripe"; // Importing PLANS from stripe config
import { cn } from "@/lib/utils"; // Importing cn utility function
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // Importing getKindeServerSession function from kinde-auth-nextjs/server
import { ArrowRight, Check, HelpCircle, Link, Minus } from "lucide-react"; // Importing Lucide icons

const Page = () => {
  // Get user information from server session
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // Define pricing items with details
  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      quota: 10, // Number of PDFs allowed per month
      features: [
        {
          text: '5 pages per PDF',
          footnote:
            'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote:
            'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote:
            'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For larger projects with higher needs.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota, // Number of PDFs allowed per month for Pro plan
      features: [
        {
          text: '25 pages per PDF',
          footnote:
            'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote:
            'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote:
            'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl" >
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">PRICING</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Whether you&apos;re just trying out our service
            or need more, we&apos;ve got you covered.
          </p>
        </div>
        <div className="pt-12 grid gap-10 lg:grid-cols-2">
          {/* Render pricing items */}
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              // Get price for the plan
              const price = PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount || 0;

              return (
                <div key={plan} className={cn(
                  "relative rounded-2xl bg-white shadow-lg",
                  {
                    "border-2 border-blue-600 shadow-blue-200": plan === "Pro",
                    "border border-gray-200": plan !== "Pro",
                  }
                )}>
                  {/* Display upgrade badge for Pro plan */}
                  {plan === "Pro" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full 
                    bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 
                    text-sm font-medium text-white">
                      Upgrade Now
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="my-3 text-center font-display text-3xl font-bold">{plan}</h3>
                    <p className="text-gray-500">{tagline}</p>
                    <p className="my-5 font-display text-6xl font-semibold">${price}</p>
                    <p className="text-gray-500">per Month</p>
                  </div>
                  <div className="flex h-20 items-center justify-center border-b border-t border-gray-200
                   bg-gray-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota?.toLocaleString()} PDFs/month included.</p>
                      {/* Tooltip for PDF quota */}
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="cursor-default ml-1.5">
                          <HelpCircle className="h-4 w-4 text-zinc-500" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          How many PDFs you can upload per month.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <ul className="my-10 space-y-5 px-8">
                    {/* Render features list */}
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {/* Render check or minus icon based on feature */}
                          {negative ? (
                            <Minus className="h-6 w-6 text-gray-300" />
                          ) : (
                            <Check className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        {/* Render feature text with optional footnote */}
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p className={cn(
                              "text-gray-600",
                              {
                                "text-gray-400": negative,
                              }
                            )}>{text}</p>
                            {/* Tooltip for feature footnote */}
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="cursor-default ml-1.5">
                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p className={cn(
                            "text-gray-600",
                            {
                              "text-gray-400": negative,
                            }
                          )}>{text}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200" />
                  <div className="p-5">
                    {/* Render appropriate button based on user and plan */}
                    {plan === 'Free' ? (
                      <Link
                        href={user ? '/dashboard' : '/sign-in'}
                        className={buttonVariants({
                          className: 'w-full',
                          variant: 'secondary',
                        })}
                      >
                        {user ? 'Upgrade now' : 'Sign up'}
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Link>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Link
                        href="/sign-in"
                        className={buttonVariants({
                          className: 'w-full',
                        })}
                      >
                        {user ? 'Upgrade now' : 'Sign up'}
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
