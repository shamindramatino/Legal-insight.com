// Importing necessary modules and components
"use client"
import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from "lucide-react"
import {Document, Page, pdfjs} from "react-pdf"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from "./ui/use-toast"
import { useResizeDetector } from "react-resize-detector"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import SimpleBar from "simplebar-react"
import PdfFullscreen from "./PdfFullscreen"

// Set PDF worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

// Define Props interface for PdfRenderer component
interface PdfRenderProps {
  url: string
}

// Define PdfRenderer component
const PdfRenderer = ({url}: PdfRenderProps) => {
  console.log("pdfrenders", url)
  // Custom hook to show toast notifications
  const { toast } = useToast()
  
  // State variables
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null> (null)

  // Check if PDF is loading
  const isLoading = renderedScale !== scale

  // Define validation schema for custom page input
  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!)
  })

  type TcustomPageValidator = z.infer<typeof CustomPageValidator>

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TcustomPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(CustomPageValidator),
  })
  
  console.log(errors)

  // Resize detector hook
  const { width, ref } = useResizeDetector()
  console.log("width", width)

  // Handle page submission
  const handlePageSubmit = ({ page }: TcustomPageValidator) => {
    setCurrPage(Number(page))
    setValue("page", String(page))
  }

  return (
    <div className="w-full bg-red rounded-md shadow flex flex-col items-center">
      {/* Header section */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        {/* Pagination controls */}
        <div className="flex items-center gap-1.5 ">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) =>
                prev -1 > 1 ? prev -1 : 1
              )
              setValue("page", String(currPage -1))
            }}
            variant='ghost'
            aria-label='previous page'>
            <ChevronDown className='h-4 w-4'/>
          </Button>
          <div className='flex items-center gap-1.5'>
            <Input
              {...register("page")}
              className={cn(
                'w-12 h-8',
                errors.page && " focus-visible:ring-red-500")}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  handleSubmit(handlePageSubmit)()
                }
              }} 
            /> 
            <p className='text-zinc-700 text-sm space-x-1'>
              <span>/</span>
              <span>{numPages  ?? "x"}</span>
            </p>    
          </div>
          <Button
            disabled={
              numPages === undefined || 
              currPage === numPages
            }  
            onClick={() => {
              setCurrPage((prev) => 
                prev +1 > numPages! ? numPages! : prev +1
              )
              setValue('page', String(currPage + 1))
            }}
            variant='ghost'
            aria-label='next page'>
            <ChevronUp className='h-4 w-4' />
          </Button>
        </div>
        {/* Zoom and rotation controls */}
        <div className='space-x-2'>
          {/* Zoom dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='gap-1.5' 
                aria-label='zoom' 
                variant='ghost'>
                <Search
                  className ='h-4 w-4'/>
                {scale * 100}%<ChevronDown className='h-3 w-3  opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Rotation button */}
          <Button 
            onClick={() => setRotation((prev) => prev +90)} 
            variant='ghost' aria-label='rotate 90 degrees'>   
            <RotateCw className='h-4 w-4' />
          </Button>
          {/* Fullscreen button */}
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>
      {/* PDF viewer section */}
      <div className='flex-1 w-full max-h-screen'>
        <SimpleBar 
          autoHide={false} 
          className='max-h [calc(100vh-10rem)]'>
          <div ref={ref}>
            <Document 
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title:'Error loading PDF',
                  description:'Please try again later',
                  variant: 'destructive',              
                })
              }}
              onLoadSuccess={({numPages}) =>
                setNumPages(numPages)
              }
              file={url} 
              className='max-h-full'>
              {/* Render PDF page */}
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}  
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null }
              <Page
                className={cn(isLoading ? "hidden" : '')}
                width={width ? width : 1}  
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={'@' +  scale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className='my-24 h-6 w-6 animate-spin'/>
                  </div>
                }
                onRenderSuccess={() => 
                  setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

// Export PdfRenderer component
export default PdfRenderer


