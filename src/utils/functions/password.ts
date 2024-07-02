import bcrypt from 'bcryptjs'

export const getPasswordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const doesPasswordMatch = (
  inputPassword: string,
  passwordHash: string,
) => bcrypt.compareSync(inputPassword, passwordHash)
