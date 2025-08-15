import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['defaults', 'not Safari < 15.4']
    }
  }
};

module.exports = {
  plugins: [
    purgeCSSPlugin({
      content: ['./**/*.html']
    })
  ]
}

postcss([
  purgeCSSPlugin({
    content: ['./src/**/*.html']
  })
])