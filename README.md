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

Tokens live under the `md.` namespace and follow the Material Design token names (`md.sys.color.primary` → `md.primary`). Color roles follow the OS light / dark setting (the `_osDark` condition):

```jsx
css({
  backgroundColor: "md.surface",
  color: "md.primary",
  textStyle: "md.body-medium",
});
```

A specific mode can be referenced explicitly with `md.light.` / `md.dark.`:

```jsx
css({
  backgroundColor: "md.dark.surface",
  color: "md.dark.primary",
});
```

# Options

| Option          | Default        | Description                                                                          |
| --------------- | -------------- | ------------------------------------------------------------------------------------ |
| `sourceColor`   | (required)     | Source color as ARGB/RGB number.                                                     |
| `customColors`  | `[]`           | Extra color roles. `blend: true` harmonizes the color with `sourceColor`; `fidelity: true` makes the container tone match the input color. |
| `variant`       | `"tonal-spot"` | Dynamic color scheme: `"tonal-spot"`, `"vibrant"`, `"expressive"` or `"neutral"`.    |
| `contrastLevel` | `0`            | `-1` (reduced) to `1` (high). `0.5` is medium contrast.                              |
| `darkCondition` | `"_osDark"`    | Panda condition used for dark colors, e.g. `"_dark"` to switch with a `.dark` class. |
| `motionScheme`  | `"standard"`   | Spring motion scheme: `"standard"` or `"expressive"`.                                |
| `languageHeight`| `"medium"`     | Line heights for the script: `"small"` (Latin, Cyrillic, Greek, Hebrew), `"medium"` (CJK, Arabic, Thai and most other scripts), `"large"` (Burmese, Telugu) or `"extra-large"` (Nastaliq). |
| `typeface`      | `{}`           | `{ brand?, plain? }` font-family values. Given roles become `md.brand` / `md.plain` font tokens and are applied to the text styles that use them (brand: display, headline, title-large; plain: the rest). Loading the fonts is up to you. |

# Tokens

| Material token                               | Panda                                                        |
| -------------------------------------------- | ------------------------------------------------------------ |
| `md.sys.color.primary`                       | `color: "md.primary"` (`md.light.primary`, `md.dark.primary`) |
| `md.ref.palette.primary40`                   | `color: "md.primary40"`                                       |
| `md.sys.shape.corner.medium`                 | `rounded: "md.medium"`                                        |
| `md.sys.state.hover.state-layer-opacity`     | `opacity: "md.hover"`                                         |
| `md.sys.elevation.level1`                    | `boxShadow: "md.level1"`                                      |
| `md.sys.measurement.space100`                | `padding: "md.space100"`                                      |
| `md.sys.state.focus-indicator.thickness`     | `outlineWidth: "md.focus-indicator.thickness"`                |
| `md.sys.state.focus-indicator.outer-offset`  | `outlineOffset: "md.focus-indicator.outer-offset"`            |
| `md.sys.motion.duration.short1`              | `transitionDuration: "md.short1"`                             |
| `md.sys.motion.easing.emphasized.decelerate` | `transitionTimingFunction: "md.emphasized.decelerate"`        |
| `md.sys.motion.spring.default.spatial`       | easing and duration `"md.spring.default.spatial"`             |
| `md.sys.typescale.body-large`                | `textStyle: "md.body-large"`                                  |
| `md.sys.typescale.emphasized.body-large`     | `textStyle: "md.emphasized.body-large"`                       |
| `md.sys.typescale.label-large.weight-prominent` | `fontWeight: "md.label-large.weight-prominent"`          |
| `md.ref.typeface.brand`                      | `fontFamily: "md.brand"`                                      |

Breakpoints are the Material window size classes: `medium` (600px), `expanded` (840px), `large` (1200px), `extraLarge` (1600px).
