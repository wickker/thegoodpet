import { sql } from '@/database'

const create = async (
  email: string,
  firstName: string,
  lastName: string,
  passwordHash: string,
  mobileNumber: string,
  cartId: string,
) =>
  await sql`
INSERT INTO customers (shopify_cart_id, email, first_name, last_name, password_hash, mobile_number, accepts_marketing)
VALUES
  (${cartId}, ${email}, ${firstName}, ${lastName}, ${passwordHash}, ${mobileNumber}, true)
RETURNING id;  
`

const findByEmailOrPhone = async (email: string, phone: string) =>
  await sql`
SELECT id
FROM customers
WHERE (email = ${email} OR mobile_number = ${phone})
AND deleted_at IS NULL;
`

const updateShopifyAccessToken = async (
  accessToken: string,
  expiresAt: string,
  customerId: number,
) =>
  await sql`
UPDATE customers
SET shopify_access_token = ${accessToken},
shopify_access_token_expires_at = ${expiresAt},
updated_at = NOW()
WHERE id = ${customerId};
`

const Customers = {
  create,
  findByEmailOrPhone,
  updateShopifyAccessToken,
}

export default Customers