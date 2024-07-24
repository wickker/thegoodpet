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
INSERT into customers (shopify_cart_id, email, first_name, last_name, password_hash, mobile_number, accepts_marketing)
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

const Customers = {
  findByEmailOrPhone,
  create,
}

export default Customers
