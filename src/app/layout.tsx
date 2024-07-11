import { getCart } from './actions'
import { Header, Cart } from '@/components/common'
import { CartProvider } from '@/contexts'
import ReactQueryProvider from '@/hooks/ReactQueryProvider'
import './styles.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
const res = await getCart()
console.log(res)


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
              {JSON.stringify(res)}
            </CartProvider>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
