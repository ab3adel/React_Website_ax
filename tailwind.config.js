module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      minWidth: {
         '4/12': '30%',
         sidebar: '6rem',
         minSidebar: '3.4rem',
         '5/12': '42%'
      },
      maxWidth: {
         '4/12': '30%'
      },
      fontSize: {
         '2xs': '.6rem',
         xs: '.75rem',
         sm: '.875rem',
         base: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
         '2xl': '1.5rem',
         '3xl': '1.875rem',
         '4xl': '2.25rem',
         '5xl': '3rem',
         '6xl': '4rem',
         '7xl': '5rem'
      },
      screens: {
         '2xl': { max: '1535px' },
         xl: { max: '1279px' },
         lg: { max: '1023px' },
         md: { max: '867px' },
         sm: { max: '639px' },
         xs: { max: '400px' }
      },
      extend: {
         colors: {
            primary: 'var(--primary)',
            'gray-light': '#E9EFF5',
            'gray-lightest': '#F5F8FA',
            'gray-dark': '#8CA0BF',
            'blue-dark': '#263246',
            'gray-base': 'var(--secondary)'
         }
      }
   },
   plugins: []
}
