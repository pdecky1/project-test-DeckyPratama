/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors:{
        'p-orange' : '#ff6600',
      },
      fontFamily:{
        Roboto: [
           'Roboto', 'sans-serif'
        ]
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

