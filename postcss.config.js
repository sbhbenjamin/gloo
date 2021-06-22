const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [tailwinds('./tailwind.config.js'), require('autoprefixer')],
}
