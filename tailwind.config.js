/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.6rem' }],      // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#FF5E8C',
          babyPink: '#FF85A2',
          peach: '#FF8C69',
          accent: '#FFF0F2',
          dark: '#1A1819',
          gray: '#706B6E',
          soft: '#FAF8F9',
        },
        flo: {
          50: '#FFF0F2',
          100: '#FFE4EB',
          200: '#FECDD9',
          300: '#FFA3BA',
          400: '#FF85A2',
          500: '#FF5E8C',
          600: '#FF477B',
          700: '#E03668',
          800: '#B8234F',
          900: '#84133D',
          accent: '#FF5E8C',
          peach: '#FF8C69',
          dark: '#1A1819',
          gray: '#706B6E',
          soft: '#FAF8F9',
          card: '#FFFFFF',
          border: '#FCE7ED'
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
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(255, 94, 140, 0.08)',
        'float': '0 12px 36px -4px rgba(255, 94, 140, 0.16)',
        'glow-pink': '0 10px 30px -5px rgba(255, 94, 140, 0.3)',
        'glow-peach': '0 10px 30px -5px rgba(255, 140, 105, 0.3)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
};
