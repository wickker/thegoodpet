import bcrypt from 'bcryptjs'

export const getPasswordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const doesPasswordMatch = (
  inputPassword: string,
  passwordHash: string | null,
) => {
  if (!passwordHash) return false
  return (
    bcrypt.compareSync(inputPassword, passwordHash) ||
    inputPassword === passwordHash // for Google customers who have bound their account
  )
}
