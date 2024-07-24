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
INSERT into customers (shopify_cart_id, email, first_name, last_name, password_hash, mobile_number)
VALUES
  (${cartId}, ${email}, ${firstName}, ${lastName}, ${passwordHash}, ${mobileNumber})
RETURNING id;  
`

const findByEmail = async (email: string) =>
  await sql`
SELECT id
FROM customers
WHERE email=${email}
AND deleted_at IS NULL;
`

const Customers = {
  findByEmail,
  create,
}

export default Customers
