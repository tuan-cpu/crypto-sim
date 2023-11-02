"use client"
import { Inter } from 'next/font/google'
import './globals.css'

//INTERNAL IMPORT
import { Navbar } from '@/components'

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
      </body>
    </html>
  )
}
