# 🎨 ColorKit × tailwind-plugin-palette

<p align="center" style="display: flex;justify-content: center;gap: 8px;">
  <img src="./tools/color-kit-palette.svg" width="200" height="200" />
  <img src="./apps/website/src/assets/logo.svg" width="200" height="200" />
</p>

## Installation

```bash
npm install --save-dev tailwind-plugin-palette
# or
pnpm add --save-dev tailwind-plugin-palette
# or
bun add --dev tailwind-plugin-palette
```

Please visit the [website](https://color-kit.github.io/palette/) to help you visualize the palette configuration.

## Usage

If you just want use tailwind's colors:

```ts
import palette, { getTailwindColors } from 'tailwind-plugin-palette'

export default {
  plugins: [
    palette({
      colors: getTailwindColors(400),
    }),
  ],
}
```

Or provide some new colors:

```ts
import palette from 'tailwind-plugin-palette'

export default {
  plugins: [
    palette({
      colors: {
        mediumblue: '#1f10b3',
        lightcoral: '#f06482',
      },
    }),
  ],
}
```

## Options

- `primary: string`: Provide a HEX value as primary color, automatically generate a secondary color.
- `harmonize: boolean`: Make the palette more harmonious with the primary color (primary required).
- `dark: boolean`: Reduce the brightness to adapt to the dark mode.
- `reversed: boolean`: Gradually darkens from 50 to 950 by tailwind's default. With the option enabled, it'll be reversed.

## License

This project is MIT licensed, see [LICENSE](LICENSE) file.
