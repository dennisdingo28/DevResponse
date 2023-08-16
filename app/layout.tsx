import './globals.css'
import type { Metadata } from 'next'

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
      <body className='min-h-screen bg-darkBlue '>
        {children}
      </body>
    </html>
  )
}
