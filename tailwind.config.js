/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import { Colors } from './src/utils/constants/common'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: Colors,
      fontFamily: {
        fredoka: ['"Fredoka"', ...defaultTheme.fontFamily.sans],
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
