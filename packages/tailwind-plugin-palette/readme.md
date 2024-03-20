# tailwindcss-plugin-palette

## Usage

first,

```js
// tailwind.config.js
const palette = require("tailwindcss-plugin-palette")

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    palette({
      primary: "#845EC2"
    })
  ],
}
```

Then feel free to use your palette!
