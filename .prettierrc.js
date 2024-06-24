import vercelPrettierConfig from '@vercel/style-guide/prettier'

export default {
  ...vercelPrettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
}
