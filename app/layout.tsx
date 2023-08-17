import AuthProvider from '@/providers/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import QueryProvider from '@/providers/QueryProvider'
import ToasterProvider from '@/providers/ToastProvider'

export const metadata: Metadata = {
  title: 'DevResponse',
  description: 'Real time coding issues response',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <QueryProvider>
          <body className='min-h-screen bg-darkBlue'>
            <ToasterProvider/>
            {children}
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  )
}
