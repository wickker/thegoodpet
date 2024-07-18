'use client'

import useCart from '@/hooks/storefrontQuery/useCart'
import useCustomer from '@/hooks/storefrontQuery/useCustomer'
import useProduct from '@/hooks/storefrontQuery/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()
  const {
    useCreateCustomerMutation,
    useCreateCustomerAccessTokenMutation,
    useGetCustomerOrdersQuery,
  } = useCustomer()
  const createCustomer = useCreateCustomerMutation((d) =>
    console.log('Customer : ', d),
  )
  const createAccessToken = useCreateCustomerAccessTokenMutation((d) =>
    console.log('Access Token : ', d),
  )
  const getCustomerOrders = useGetCustomerOrdersQuery(
    '3fe33afb06add3a1b168c2cb3cedf9f1',
  )
  const {
    useCreateCartMutation,
    useGetCartQuery,
    useAddItemToCartMutation,
    useUpdateCartQuantityMutation,
  } = useCart()
  const createCart = useCreateCartMutation((d) => console.log('Cart : ', d))
  const getCart = useGetCartQuery(
    'gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUoySzNYUkFUNjBDUUY5UEJRR0tEN044VA?key=5ca901972ab9cc384a2ca4a4f68dc207',
  )
  const addItemToCart = useAddItemToCartMutation((d) =>
    console.log('Cart : ', d),
  )
  const updateCartItemQuantity = useUpdateCartQuantityMutation((d) =>
    console.log('Cart : ', d),
  )

  return (
    <>
      <p className="text-purple-500">
        {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
      </p>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() => {
          createCustomer.mutate({
            firstName: 'Choy',
            lastName: 'Dian',
            email: 'choydianchun@gmail.com',
            phone: '+6598157820',
            password: 'abc123',
            acceptsMarketing: true,
          })
        }}
      >
        {createCustomer.isPending ? 'Loading...' : 'Create User'}
      </button>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() => {
          createAccessToken.mutate({
            email: 'choydianchun@gmail.com',
            password: 'abc123',
          })
        }}
      >
        {createAccessToken.isPending ? 'Loading...' : 'Create Access Token'}
      </button>

      <div>{JSON.stringify(getCustomerOrders.data)}</div>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() => {
          createCart.mutate({
            lines: [
              {
                quantity: 1,
                merchandiseId: 'gid://shopify/ProductVariant/43571215368249',
                sellingPlanId: 'gid://shopify/SellingPlan/5732368441',
              },
            ],
            buyerIdentity: {
              customerAccessToken: '3fe33afb06add3a1b168c2cb3cedf9f1',
            },
          })
        }}
      >
        {createCart.isPending ? 'Loading...' : 'Create Cart'}
      </button>

      <div>{JSON.stringify(getCart.data)}</div>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() =>
          addItemToCart.mutate({
            cartId:
              'gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUoySzNYUkFUNjBDUUY5UEJRR0tEN044VA?key=5ca901972ab9cc384a2ca4a4f68dc207',
            lines: [
              {
                merchandiseId: 'gid://shopify/ProductVariant/43599695249465',
                quantity: 1,
                sellingPlanId: 'gid://shopify/SellingPlan/5732368441',
              },
            ],
          })
        }
      >
        Add Item to Cart
      </button>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() =>
          updateCartItemQuantity.mutate({
            cartId:
              'gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUoySzNYUkFUNjBDUUY5UEJRR0tEN044VA?key=5ca901972ab9cc384a2ca4a4f68dc207',
            lines: [
              {
                id: 'gid://shopify/CartLine/23bab46c-a029-4998-b221-dc9297f98efd?cart=Z2NwLWFzaWEtc291dGhlYXN0MTowMUoySzNYUkFUNjBDUUY5UEJRR0tEN044VA',
                quantity: 0, // this removes the item from cart
              },
            ],
          })
        }
      >
        Add Quantity to Item
      </button>
    </>
  )
}
