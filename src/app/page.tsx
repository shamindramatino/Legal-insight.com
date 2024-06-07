
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {ArrowRight} from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Home() {
  return (
    <>
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border 
      border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all  hover:border-gray-300 hover:bg-white/50'>
        <p className='text-sm animate-in font-semibold text-gray-700'>
          Legalinsight is now public!
        </p>
      </div>
      <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
            Introducing your   {' '}
         <span className='text-blue-600'>AI Legal</span>{' '}
          Assistant.
      </h1>
      <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
      Legalinsight performs document review, contract analysis and timeline creation in Minutes.
      </p>
      {/* <Link 
      className={buttonVariants({
        size:'lg',
        className:'mt-5',
      })} href='/dashboard'
       target="_blank" >
      Get Started{' '}
       <ArrowRight className='ml-2 h-5 w-5' />
      </Link> */}
       <RegisterLink
                className={buttonVariants({
                  size: 'lg',
                  className:'mt-5'
                })}>
                Join for free{' '}
                {/* <ArrowRight className='ml-2 h-5 w-5' /> */}
              </RegisterLink>
    </MaxWidthWrapper>
    <div>
      <div className='relative isolate'>
        <div 
        aria-hidden="true" 
        className='pointer-events-none absolute insert-x-0 -top-40 -z-10 transform-gpu 
        overflow-hidden blur-3xl sm:top-80'>
          <div style={{
            clipPath:""
          }} className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[360deg] 
          bg-gradient-to-tr from[#ff80b5] to-[#9089fc] opacity-30 sm:left[calc(50%-30rem)] sm:[72.1875rem]'
          />
        </div>
        <div>
          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='mt-16 flow-root 5m:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-500/5 p-s ring-1 ring-inset ring-gray-500/10 lg:-m-4 
              lg:rounded-2xl lg:p-4'>
               <Image 
               src='/chatbot-for-clinic-doctor-appointment.png' 
               alt='product preview'
               width={1200}
               height={866}
               quality={100}
               className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1  ring-gray-500/10'
               ></Image>              
                </div>
            </div>
          </div>
        </div>
         
        <div 
        aria-hidden="true" 
        className='pointer-events-none absolute insert-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-80'>
          <div style={{
            clipPath:"'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', "
          }} className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[360deg] 
          bg-gradient-to-tr from[#ff80b5] to-[#9089fc] opacity-30 sm:left[calc(50%-36rem)] sm:[72.1875rem]'
          />
        </div>       
      </div>
    </div>
    {/* Feature section */}

    <div className='mx-auto mb-32 mt-32  max-w-5xl '>
      <div className='mb-12 px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          {/* <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>Submit your legal inquiries on Legalinsight</h2> */}
          <p className='mt-2 font-bold text-4xl text-gray-900'>
            Submit your legal inquiries on Legalinsight. 
          </p>
        </div>
      </div>
    </div>

{/* Design */}
 <div  className="flex justify-between  md:flex md:space-x-12 md:space-y-0" >
    <div className="max-w-sm p-2 ml-10  mt-10">
        <h1 className=" text-2xl font-bold tracking-tight text-cyan-400
         dark:text-white text-center ">Features of Legalinsight</h1>
    <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">Boost your Productivity with features that cover the 
    hard work, from document automation to advanced research.</p>
    <ul className=" ml-20 text-sm list-decimal">
      <li>Ask the Legalinsight</li>
      <li>Calender View </li>
      <li>Personalized for you</li>
      <li>AI Document handling </li>
      <li>Trusted Privacy</li>
      <li>Smart alerts</li>
    </ul>   
   </div>

   {/* center */}
   <div className="flex flex-col space-y-10 ">
   <div className=" max-w-sm p-2 h-30  border-gray-200 rounded-full shadow 
      dark:bg-gray-800 border-2 dark:border-gray-700  ">
  {/* icon */}
    <center>
     <svg className="w-6 h-6 text-gray-800 justify-end  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
     width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
  stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/>
  </svg>
 
  {/* icon */}
  <h5 className=" text-1xl font-semibold tracking-tight text-white-00
         dark:text-white text-center">Upload Documents</h5>
         <p className="text-center text-sm ">
          Upload your documents with
           ease and speed
         </p>
         </center>
   </div>
     {/* customize */}
    <div className="max-w-sm p-2 h-22 bg-white border border-gray-200 rounded-full shadow 
    dark:bg-gray-800 dark:border-gray-700  mb-10"> 
    <center> 
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
  </svg>
  
        <h5 className=" text-1xl font-semibold tracking-tight text-white-00
         dark:text-white text-center">Customize & Review</h5>
         <p className="text-center text-sm">
          Customize & Review your doc with legalinsight
         </p>
         </center>
        
    </div>
    <div className="max-w-sm p-2 h-22 bg-white border border-gray-200 rounded-full shadow 
    dark:bg-gray-800 dark:border-gray-700  mb-20"> 
    <center>
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
 </svg>
   
       <h5 className=" text-1xl font-semibold tracking-tight text-white-00
         dark:text-white text-center">Instant Answer </h5>
         <p className="text-center text-sm">
         Get answer your question and points to the sources instantly
         </p>
       </center> 
    </div>
   </div>

   {/* center */}

   <div className="max-w-sm p-2 mt-20 mb-20 ">
        <h5 className="mb-2 mt-10 text-2xl font-bold tracking-tight text-cyan-400
         dark:text-white ml-10">Faster. Cheaper</h5>
    <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400 mr-7">
     Our Legalinsight  software is quickly,easy and wallet-friendly
     <br /><br />
     Expereience the ease of navigation through intricate,lenghty and jargon-filled documents with our assistance
    </p>  
  </div>
</div>
{/* Design */}
    {/* steps */}
    {/* <ol className='my-8 space-y-4 pt-8 px-3 md:flex md:space-x-12 md:space-y-0'>
      <li className='md:flex-1'>
        <div className=' flex flex-col space-y-2 border-l-4  border-zinc-300 py-2 pl-4 md:border-l-0 
        md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
          <span className='text-sm font-medium  text-blue-600'>
            Step1
            </span>
          <span className='text-xl font-semibold'>
            Sign up for an account
            </span>
          <span className='mt-2 text-zinc-700'>
            Either starting out with  a free plan or choose our {''}
            <Link 
            href='/pricing' 
            className='text-blue-700 underline underline-offset-2'>
            pro plan
            </Link>
               .
          </span>
        </div>
      </li>
      <li className='md:flex-1'>
        <div className=' flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 
        md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
          <span className='text-sm font-medium  text-blue-600'>
            Step2
            </span>
          <span className='text-xl font-semibold'>
            Upload your PDF file
            </span>
          <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it
                ready for you to chat with.
          </span>
        </div>
      </li>
      <li className='md:flex-1'>
        <div className=' flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 
        md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 '>
          <span className='text-sm font-medium  text-blue-600'>
            Step3
            </span>
          <span className='text-xl font-semibold'>
            Start asking questions?
            </span>
          <span className='mt-2 text-zinc-700'>
               It&apos;s that simple. Try out Legalinsight today -
                it really takes less than a minute.
          </span>
        </div>
      </li>
    </ol> */}
      
    {/* <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='mt-16 flow-root 5m:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-400/5 p-s ring-1 ring-inset ring-gray-400/10 lg:-m-4 
              lg:rounded-2xl lg:p-4'>
               <Image 
               src='/download%20(4).png' 
               alt='uploading preview'
               width={1419}
               height={632}
               quality={100}
               className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1  ring-gray-400/10'
               ></Image>              
                </div>
            </div>
          </div> */}

    {/* who is legalinsight for */}
     <div className="space-y-10 mt-20 ">
     <div>
     <h1 className="text-center text-4xl">
        Who is Legalinsight for?
     </h1>
     <p className="text-center mt-5">
      Here for you,Whether you're consumers. Practicing law, or studying it, our simple 
      goal is to make justice widely available
     </p>
     </div>
     {/* img 1 */}
    <div> 
    <center> 
     <a href="#" className="flex flex-col  md:flex-row md:max-w-xl ">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/IMG-20240408-WA0002.jpg" alt=""></img>
    <div className="flex flex-col justify-between p-10 leading-normal">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Legalinsight for <br /> <span className="text-fuchsia-900">Lawyers</span>.</p>
    </div>
  </a>
   </center>
</div>

{/* img 2 */}
<div>
<center>
<a href="#" className="flex flex-col   md:flex-row md:max-w-xl ">
    <div className="flex flex-col justify-between p-10 leading-normal ">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Legalinsight for <br /><span className="">Law Film</span>.</p>
    </div>
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/IMG-20240408-WA0001.jpg" alt=""></img>
    </a>
     </center>
</div>
{/* img 3 */}
<div> 
    <center> 
     <a href="#" className="flex flex-col  md:flex-row md:max-w-xl ">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/IMG-20240408-WA0003.jpg" alt=""></img>
    <div className="flex flex-col justify-between p-10 leading-normal">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
  </a>
   </center>
</div>

</div> 
      {/* who is legalinsight for */}

      {/* why legalinsight is better */}
      <div>
      <section id="features" className="px-2 space-y-6 py-8 md:py-12 lg:py-24 max-w-5xl mx-auto">
    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h4 className=" text-4xl sm:text-3xl md:text-4xl">Why Legalinsight is better?</h4>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
           It provides a comprehensive and user-friendly approach to making justice widely accesible
        </p>
    </div>

    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-full border bg-gray-100/50 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">

              {/* <svg xmlns="http://www.w3.org/2000/svg"
                    width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="">
                    <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                </svg> */}
                <center>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>

                <div className="space-y-2">
                    <h3 className="font-bold">Fast</h3>
                    <p className="text-sm text-muted-foreground">Idea for avoiding expenses and appoinments, the quickest online legal service.
                    </p>
                </div>
                </center>
            </div>
        </div>
        <div className="relative overflow-hidden rounded-full border bg-gray-100/50 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            
              {/* <svg xmlns="http://www.w3.org/2000/svg"
                    width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="">                  
                </svg> */}
                <center>
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
    <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path>
        </svg>
       
                <div className="space-y-2">
                    <h3 className="font-bold">Cost-effective</h3>
                    <p className="text-sm text-muted-foreground">Legal insight offers an affordable alternative,eliminating traditional law market's his costs.
                        tools.</p>
                </div>
                </center>
            </div>
        </div>
        <div className="relative overflow-hidden rounded-full border bg-gray-100/50 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              {/* <svg xmlns="http://www.w3.org/2000/svg"
                    width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg> */}
                <center>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
                
                <div className="space-y-2">
                    <h3 className="font-bold">Private</h3>
                    <p className="text-sm text-muted-foreground"> Ensuring that users conversation remain secure and anonymous,we stand frim on privacy.</p>
                </div>
                </center>
            </div>
        </div>
    </div>
</section>
      </div>
     {/* why legalinsight is better */}
     {/* FAQ */}
     <div className="bg-white-100 px-2 py-10">
  <div id="features" className="mx-auto max-w-6xl">
    <p className="text-center text-base font-semibold leading-7 text-primary-500">FAQs</p>
    <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
     Frequently asked questions
    </h2>
    <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
        {/* <img src="https://www.svgrepo.com/show/530438/ddos-protection.svg" alt="" className="mx-auto h-10 w-10"></img> */}
    <svg className="mx-auto h-10 w-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
</svg>

        <h3 className="my-3 font-display font-medium">Is there a free trial availabe?</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
          the cutting-edge language model that makes interactions a breeze. With its user-friendly interface,
          effortlessly tap into the world of AI-generated text.
        </p>
      </li>
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
        {/* <img src="https://www.svgrepo.com/show/530442/port-detection.svg"
                alt="" className="mx-auto h-10 w-10"></img> */}
   <svg className="mx-auto h-10 w-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>

        <h3 className="my-3 font-display font-medium">Easy to use</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
          Simply input your subject, click the generate button, and the result will appear in seconds just like
          magick.
        </p>

      </li>
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
        {/* <img src="https://www.svgrepo.com/show/530444/availability.svg" alt="" className="mx-auto h-10 w-10"></img> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban mx-auto h-10 w-10 " viewBox="0 0 16 16">
  <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg>

        <h3 className="my-3 font-display font-medium">Custom settings</h3>
        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
          We offer advanced customization. You can freely combine options like roles, languages, publish, tones,
          lengths,
          and formats.
        </p>

      </li>
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
          {/* <img src="https://www.svgrepo.com/show/530440/machine-vision.svg" alt="" className="mx-auto h-10 w-10"></img> */}
          <svg className=" mx-auto h-10 w-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

          <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Free trial</h3>
          <p className="mt-1.5 text-sm leading-6 text-secondary-500">We offer a free trial service without login. We
            provide
            many payment options including pay-as-you-go and subscription.</p>
      </li>
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
          {/* <img src="https://www.svgrepo.com/show/530450/page-analysis.svg" alt="" className="mx-auto h-10 w-10"></img> */}
          
          <svg className=" mx-auto w-10 h-10  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h.01M9 8h.01M12 8h.01M4 11h16M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
</svg>

          <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
            How does billing work?
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-secondary-500">We offer many templates covering areas such as
            writing,
            education, lifestyle and creativity to inspire your potential. </p>
      </li>
      <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
          {/* <img src="https://www.svgrepo.com/show/530453/mail-reception.svg" alt="" className="mx-auto h-10 w-10"></img> */}
          <svg className="mx-auto h-10 w-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
</svg>

          <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Use Anywhere</h3>
          <p className="mt-1.5 text-sm leading-6 text-secondary-500">Our product is compatible with multiple platforms
            including Web, Chrome, Windows and Mac, you can use MagickPen anywhere.</p>
      </li>
    </ul>
  </div>

</div>

     {/* FAQ */}

<footer className="bg-white dark:bg-gray-900">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
              <Avatar>
           <AvatarImage src="/IMG-20240410-WA0002.jpg" />
            <AvatarFallback>CN</AvatarFallback>
              </Avatar>    
                  <span className="self-center text-2xl font-semibold whitespace-nowrap ml-4 dark:text-white">Legalinsight</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">About</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href=" #" className="hover:underline">Contact</a>
                      </li>
                      <li>
                          <a href=" #" className="hover:underline">Blog</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline ">Instagram</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Twitter</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>    
      <span className="block text-sm text-gray-500 sm:text-center mt-10  dark:text-gray-400">© 2024 Legalinsight™.
   All Rights Reserved.</span>  
    </div>
</footer>
 
    </>   
  )    
}


