"use client"
import { Inter } from 'next/font/google'
import './globals.css'

//INTERNAL IMPORT
import { Footer, Navbar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}




// declare global {
//   interface Window {
//     ethereum: {
//       on: any;
//       request: (request: {
//         method: string;
//         params?: Array<any>;
//       }) => Promise<any>;
//     };
//   }
// }