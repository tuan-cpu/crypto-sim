import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import { Inter } from 'next/font/google';
export const metadata = {
    title: "Crypto Sims",
    description: "A NEXT.JS 14 Meta Crypto Application"
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}:{children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}