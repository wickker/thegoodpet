import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
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
  shopify_customer_id: string | null
  google_sub_id: string | null
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

type ListOfCustomerIds = Array<Pick<Customer, 'id'>>

type ListOfCustomers = Array<
  Pick<Customer, 'id' | 'shopify_cart_id' | 'password_hash'>
>

type ListOfGoogleCustomers = Array<
  Pick<
    Customer,
    'id' | 'shopify_cart_id' | 'google_sub_id' | 'password_hash' | 'email'
  >
>

const create = async (
  email: string,
  passwordHash: string,
  cartId: string,
  acceptsMarketing: boolean,
  mobileNumber?: string,
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

const createGoogle = async (
  email: string,
  passwordHash: string,
  cartId: string,
  sub: string,
): Promise<DbResponse<ListOfCustomerIds>> => {
  try {
    const data = await sql`
    INSERT INTO customers (shopify_cart_id, email, password_hash, accepts_marketing, google_sub_id)
    VALUES
        (${cartId}, ${email}, ${passwordHash}, true, ${sub})
    RETURNING id;  
    `
    return { data: data as ListOfCustomerIds, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updatePasswordHash = async (
  passwordHash: string,
  email: string,
): Promise<DbResponse> => {
  try {
    const data = await sql`
    UPDATE customers
    SET password_hash = ${passwordHash},
    updated_at = NOW()
    WHERE email = ${email};
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findByEmailOrPhone = async (
  email: string,
  phone?: string,
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

const findByGoogleSub = async (
  sub: string,
): Promise<DbResponse<ListOfGoogleCustomers>> => {
  try {
    const data = await sql`
    SELECT id, shopify_cart_id, google_sub_id, password_hash, email
    FROM customers
    WHERE google_sub_id = ${sub}
    AND deleted_at IS NULL;
    `
    return {
      data: data as ListOfGoogleCustomers,
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

// For sign up
const updateShopifyAccessTokenAndCustomerId = async (
  accessToken: string,
  expiresAt: string,
  customerId: number,
  shopifyCustomerId: string,
): Promise<DbResponse> => {
  try {
    const data = await sql`
    UPDATE customers
    SET shopify_access_token = ${accessToken},
    shopify_access_token_expires_at = ${expiresAt},
    shopify_customer_id = ${shopifyCustomerId},
    updated_at = NOW()
    WHERE id = ${customerId};
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

// For login
const updateShopifyAccessTokenAndCartId = async (
  accessToken: string,
  expiresAt: string,
  customerId: number,
  cartId: string,
): Promise<DbResponse> => {
  try {
    const data = await sql(
      format(
        `UPDATE customers
        SET shopify_access_token = ${accessToken},
        shopify_access_token_expires_at = ${expiresAt},`,
        cartId && `shopify_cart_id = ${cartId},`,
        `updated_at = NOW()
        WHERE id = ${customerId};`,
      ),
    )
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Customers = {
  create,
  createGoogle,
  findByEmail,
  findByEmailOrPhone,
  findByGoogleSub,
  updatePasswordHash,
  updateShopifyAccessTokenAndCartId,
  updateShopifyAccessTokenAndCustomerId,
  updateShopifyAccessTokenExpiry,
}

export default Customers
