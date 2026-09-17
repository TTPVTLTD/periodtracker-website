/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flo: {
          50: '#fff1f5',
          100: '#ffe4ec',
          200: '#fecddc',
          300: '#fea3be',
          400: '#fc6a97',
          500: '#f43f77',
          600: '#e11d5f',
          700: '#be124d',
          800: '#9e1243',
          900: '#84133d',
          accent: '#ff5398',
          soft: '#fdf2f4',
          card: '#fff7f9',
          border: '#fce7f0'
        },
        ovulation: {
          light: '#e0f2fe',
          teal: '#0284c7',
          mint: '#10b981',
          mintLight: '#ecfdf5',
        },
        pregnancy: {
          light: '#fef3c7',
          gold: '#d97706',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(244, 63, 119, 0.08)',
        'float': '0 12px 36px -4px rgba(244, 63, 119, 0.14)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
};
