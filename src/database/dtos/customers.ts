import { NeonDbError } from '@neondatabase/serverless'
import { sql } from '@/database'

// TODO: Add logging

const create = async (
  email: string,
  firstName: string,
  lastName: string,
  passwordHash: string,
  mobileNumber: string,
  cartId: string,
) => {
  try {
    const data = await sql`
    INSERT INTO customers (shopify_cart_id, email, first_name, last_name, password_hash, mobile_number, accepts_marketing)
    VALUES
        (${cartId}, ${email}, ${firstName}, ${lastName}, ${passwordHash}, ${mobileNumber}, true)
    RETURNING id;  
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findByEmailOrPhone = async (email: string, phone: string) => {
  try {
    const data = await sql`
      SELECT id
      FROM customers
      WHERE (email = ${email} OR mobile_number = ${phone})
      AND deleted_at IS NULL;
      `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findByEmail = async (email: string) => {
  try {
    const data = await sql`
    SELECT id, shopify_cart_id, password_hash
    FROM customers
    WHERE email = ${email}
    AND deleted_at IS NULL;
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updateShopifyAccessToken = async (
  accessToken: string,
  expiresAt: string,
  customerId: number,
) => {
  try {
    const data = await sql`
    UPDATE customers
    SET shopify_access_token = ${accessToken},
    shopify_access_token_expires_at = ${expiresAt},
    updated_at = NOW()
    WHERE id = ${customerId};
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Customers = {
  create,
  findByEmail,
  findByEmailOrPhone,
  updateShopifyAccessToken,
}

export default Customers
