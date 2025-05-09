import '../styles/globals.css'
import { Box } from '@mui/material'
import ClientChatProvider from './ClientChatProvider'

export const metadata = {
  title: 'JLL Portfolio',
  description: 'JLL Portfolio Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientChatProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
          </Box>
        </ClientChatProvider>
      </body>
    </html>
  )
}