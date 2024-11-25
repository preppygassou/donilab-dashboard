import { Montserrat_Alternates } from 'next/font/google'
import { Metadata } from 'next'
/* import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"; */
import { cn } from "@/lib/utils"
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnarToaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers/theme-provider'
import { Providers } from '@/providers/query-provider'
import SessionProvider from './providers'
import { getServerSideAuth } from '@/actions/auth'
import './global.css'


const montserrat_Alternates = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat-alternates',
})

export const metadata: Metadata = {
  title: 'Donilab',
  description: 'Incubateur | Coworking | FabLab',
}

export default async function RootLayout({
  children,
 
}: {
  children: React.ReactNode,

}) {
  //const session = await auth();
  const session = await getServerSideAuth();

return (
  <>
  
  {/* <SessionProvider session={session}> */}
       <html suppressHydrationWarning>
         <body 
          className={cn(
           montserrat_Alternates.variable,
         )}>
       
       <ThemeProvider
         attribute="class"
         defaultTheme="ligth"
         enableSystem
         disableTransitionOnChange
       >
         <SessionProvider session={session}>
         <Providers>
         {children}
         <Toaster />
         <SonnarToaster position="bottom-left" />
         </Providers>
         </SessionProvider>
       </ThemeProvider>
        
         </body>
       </html>
       {/* </SessionProvider> */}
       </>
 )
}