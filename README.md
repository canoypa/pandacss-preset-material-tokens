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
    materialTokens({
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

```jsx
css({
  backgroundColor: "dark.surface"
  color: "dark.primary",
  textStyle: "body-medium"
});
```
