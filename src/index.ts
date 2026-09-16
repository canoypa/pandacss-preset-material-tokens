import { definePreset, type Preset } from "@pandacss/dev";
import * as tokens from "./tokens";
import type { ColorOptions } from "./tokens/colors";

export type { CustomColor, SchemeVariant } from "./tokens/colors";

export type Options = ColorOptions;

export function presetMaterialTokens(options: Options): Preset {
  const colors = tokens.makeColors(options);

  return definePreset({
    name: "preset-material-tokens",
    theme: {
      extend: {
        tokens: {
          radii: tokens.radii,
          colors: colors.tokens,
          opacity: tokens.opacity,
          shadows: tokens.shadows,
          durations: tokens.durations,
          easings: tokens.easings,
        },
        semanticTokens: {
          colors: colors.semanticTokens,
        },
        breakpoints: tokens.breakpoints,
        textStyles: tokens.textStyles,
      },
    },
  });
}

export default presetMaterialTokens;
