/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
      '0': '0px',
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '155px',
      '6': '30rem',
      '9': '3px',
      '300': '300px',
      '40': '35rem',
      '45': '45rem',
      '195': '195px'
    },
    typography: {
      DEFAULT: {
        css: {
          // Define your custom radio button style
          // Use ::before and ::after for the radio button and its checked state
          input: {
            'appearance': 'none',
            'color':'blue',
            'width': '1rem',
            'height': '1rem',
            'border': '2px solid currentColor',
            'border-radius': '50%',
            'content': '""',
            'display': 'inline-block',
            'vertical-align': 'middle',
            'margin-right': '0.375rem',
            'transition': '0.2s',
          },
          'input:checked::before': {
            'backgroundColor': 'currentColor',
          },
        },
      },

    },
  },
  plugins: [],
}
}
