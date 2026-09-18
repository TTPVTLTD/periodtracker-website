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
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px min required
        'sm': ['0.975rem', { lineHeight: '1.4rem' }],    // ~15.6px
        'base': ['1.1rem', { lineHeight: '1.65rem' }],   // ~17.6px
        'lg': ['1.225rem', { lineHeight: '1.75rem' }],   // ~19.6px
        'xl': ['1.375rem', { lineHeight: '1.85rem' }],   // ~22px
        '2xl': ['1.65rem', { lineHeight: '2.15rem' }],   // ~26.4px
        '3xl': ['2.05rem', { lineHeight: '2.45rem' }],   // ~32.8px
        '4xl': ['2.5rem', { lineHeight: '2.85rem' }],    // ~40px
        '5xl': ['3.3rem', { lineHeight: '1.15' }],       // ~52.8px
        '6xl': ['3.85rem', { lineHeight: '1.1' }],
        '7xl': ['4.75rem', { lineHeight: '1.05' }],
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
