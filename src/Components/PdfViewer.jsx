import { Spinner } from '@chakra-ui/react'
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export function PdfViewer({ previewUrl }) {
   const [numPages, setNumPages] = useState(null)

   const [pageNumber, setPageNumber] = useState(1)

   const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
      setNumPages(nextNumPages)
   }

   function changePage(offset) {
      setPageNumber((prevPageNumber) => prevPageNumber + offset)
   }

   function previousPage() {
      changePage(-1)
   }

   function nextPage() {
      changePage(1)
   }
   return (
      <>
         <Document
            file={previewUrl}
            loading={<Spinner />}
            error={<Spinner />}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
         </Document>
         
         {numPages && (
            <>
               <button
                  className="bg-white absolute left-3 top-1/2"
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}>
                  <BsArrowLeftCircle className="text-gray-base text-2xl" />
               </button>
               <button
                  className="bg-white absolute right-3 top-1/2"
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}>
                  <BsArrowRightCircle className="text-gray-base text-2xl" />
               </button>
            </>
         )}
      </>
   )
}
