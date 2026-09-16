# pandacss-preset-material-tokens

# Installation

```shell
npm install --save-dev pandacss-preset-material-tokens
```

# Usage

```js
import { defineConfig } from "@pandacss/dev";

import presetMaterialTokens from "pandacss-preset-material-tokens";

export default defineConfig({
  presets: [
    presetMaterialTokens({
      sourceColor: 0x8282f4,
      customColors: [
        { name: "info", value: 0x42a5f5, blend: true },
        { name: "warning", value: 0xffee58, blend: true },
        { name: "success", value: 0x66bb6a, blend: true },
      ],
    }),
  ],
});
```

Color roles switch between light and dark with the `_dark` condition:

```jsx
css({
  backgroundColor: "surface",
  color: "primary",
  textStyle: "body-medium",
});
```

A specific mode can be referenced explicitly with the `light.` / `dark.` prefix:

```jsx
css({
  backgroundColor: "dark.surface",
  color: "dark.primary",
});
```

# Options

| Option          | Default        | Description                                                                        |
| --------------- | -------------- | ---------------------------------------------------------------------------------- |
| `sourceColor`   | (required)     | Source color as ARGB/RGB number.                                                   |
| `customColors`  | `[]`           | Extra color roles. `blend: true` harmonizes the color with `sourceColor`.          |
| `variant`       | `"tonal-spot"` | Dynamic color scheme: `"tonal-spot"`, `"vibrant"`, `"expressive"` or `"neutral"`.  |
| `contrastLevel` | `0`            | `-1` (reduced) to `1` (high). `0.5` is medium contrast.                            |
| `darkCondition` | `"_dark"`      | Panda condition used for dark colors, e.g. `"_osDark"` to follow the OS setting.   |

# Tokens

- `colors`: color roles, custom colors and tonal palettes (`primary-40` etc.), each under `light.` / `dark.` and as semantic tokens
- `radii`: shape corner scale (`extra-small` … `extra-extra-large`, `full`)
- `opacity`: state layer opacities (`hover`, `focus`, `pressed`, `dragged`)
- `shadows`: elevation levels `0`–`5`
- `durations`, `easings`: motion
- `breakpoints`: window size classes (`sm` medium, `md` expanded, `lg` large, `xl` extra-large)
- `textStyles`: type scale, and `*-emphasized` variants
