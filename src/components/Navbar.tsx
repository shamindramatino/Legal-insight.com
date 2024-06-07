import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {RegisterLink, LoginLink, getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const Navbar = () =>{

     const { getUser } = getKindeServerSession()
    const user = getUser()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 
    bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper >
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
        {/* <Avatar>
           <AvatarImage src="/IMG-20240402-WA0000.jpg" />
            <AvatarFallback>CN</AvatarFallback>
              </Avatar>
          <Link
            href='/'
            className='flex z-40 font-semibold '>
            <span>Legalinsight.io.</span>
          </Link> */}
          <div className="flex items-center"> {/* Container for both Avatar and Link */}
  <Avatar>
    <AvatarImage src="/IMG-20240410-WA0002.jpg" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Link href='/' className='flex z-40 font-semibold ml-2'> {/* Use ml-2 to add margin-left */}
    <span>Legalinsight</span>
  </Link>
</div>


          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
              <div className='mr-20 px-20 space-x-5 items-center'>
              <Link
                  href='/main'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Main
                </Link>
                <Link
                  href='/affiliate'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  FAQ 
                </Link>
                <Link
                  href='/affiliate'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  About
                </Link>               
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                </div>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Join for free{' '}
                  {/* <ArrowRight className='ml-1.5 h-5 w-5' /> */}
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>               
                  <UserAccountNav  
                    name={!user.given_name || !user.family_name
                      ? 'You Account'
                      : `${user.given_name} ${user.family_name}`}
                    email={user.email ?? ''}
                    imageUrl={user.picture ?? ``}  />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
   

export default Navbar