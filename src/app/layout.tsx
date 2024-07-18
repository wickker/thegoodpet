import { Cart } from '@/components/Cart'
import { Header } from '@/components/common'
import { CartProvider } from '@/contexts'
import ReactQueryProvider from '@/hooks/ReactQueryProvider'
import './styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Good Pet</title>
      </head>
      <body>
        <ReactQueryProvider>
          <main className="h-dvh overflow-y-auto bg-background font-inter">
            <CartProvider>
              <Cart />
              <Header />
              {children}
            </CartProvider>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
