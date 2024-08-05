import { NeonDbError } from '@neondatabase/serverless'
import { DbResponse, sql } from '@/database'

type Customer = {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  password_hash: string | null
  mobile_number: string | null
  shopify_access_token: string | null
  shopify_access_token_expires_at: string | null
  accepts_marketing: boolean
  shopify_cart_id: string | null
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

type ListOfCustomerIds = Array<Pick<Customer, 'id'>>

type ListOfCustomers = Array<
  Pick<Customer, 'id' | 'shopify_cart_id' | 'password_hash'>
>

const create = async (
  email: string,
  passwordHash: string,
  mobileNumber: string,
  cartId: string,
  acceptsMarketing: boolean,
): Promise<DbResponse<ListOfCustomerIds>> => {
  try {
    const data = await sql`
    INSERT INTO customers (shopify_cart_id, email, password_hash, mobile_number, accepts_marketing)
    VALUES
        (${cartId}, ${email}, ${passwordHash}, ${mobileNumber || 'NULL'}, ${acceptsMarketing})
    RETURNING id;  
    `
    return { data: data as ListOfCustomerIds, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findByEmailOrPhone = async (
  email: string,
  phone: string,
): Promise<DbResponse<ListOfCustomerIds | ListOfCustomers>> => {
  if (phone) {
    try {
      const data = await sql`
        SELECT id
        FROM customers
        WHERE (email = ${email} OR mobile_number = ${phone})
        AND deleted_at IS NULL;
        `
      return { data: data as ListOfCustomerIds, error: null }
    } catch (err) {
      return { data: null, error: (err as NeonDbError).message }
    }
  }
  return findByEmail(email)
}

const findByEmail = async (
  email: string,
): Promise<DbResponse<ListOfCustomers>> => {
  try {
    const data = await sql`
    SELECT id, shopify_cart_id, password_hash
    FROM customers
    WHERE email = ${email}
    AND deleted_at IS NULL;
    `
    return {
      data: data as ListOfCustomers,
      error: null,
    }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updateShopifyAccessTokenExpiry = async (
  email: string,
): Promise<DbResponse> => {
  try {
    const data = await sql`
    UPDATE customers
    SET shopify_access_token_expires_at = NOW(),
    updated_at = NOW()
    WHERE email = ${email};
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
): Promise<DbResponse> => {
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

const updateShopifyAccessTokenAndCartId = async (
  accessToken: string,
  expiresAt: string,
  customerId: number,
  cartId: string,
): Promise<DbResponse> => {
  if (cartId) {
    try {
      const data = await sql`
        UPDATE customers
        SET shopify_access_token = ${accessToken},
        shopify_access_token_expires_at = ${expiresAt},
        shopify_cart_id = ${cartId},
        updated_at = NOW()
        WHERE id = ${customerId};
        `
      return { data, error: null }
    } catch (err) {
      return { data: null, error: (err as NeonDbError).message }
    }
  }
  return updateShopifyAccessToken(accessToken, expiresAt, customerId)
}

const Customers = {
  create,
  findByEmail,
  findByEmailOrPhone,
  updateShopifyAccessToken,
  updateShopifyAccessTokenAndCartId,
  updateShopifyAccessTokenExpiry,
}

export default Customers
