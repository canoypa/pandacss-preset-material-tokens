import { definePreset, type Preset } from "@pandacss/dev";
import * as tokens from "./tokens";
import type { CustomColor } from "./tokens/colors";

export type { CustomColor } from "./tokens/colors";

export type Options = {
  sourceColor: number;
  customColors?: CustomColor[];
};

export function presetMaterialTokens({
  sourceColor,
  customColors,
}: Options): Preset {
  return definePreset({
    name: "preset-material-tokens",
    theme: {
      extend: {
        tokens: {
          radii: tokens.radii,
          colors: tokens.makeColors(sourceColor, customColors),
          opacity: tokens.opacity,
          shadows: tokens.shadows,
          durations: tokens.durations,
          easings: tokens.easings,
          zIndex: tokens.zIndex,
        },
        breakpoints: tokens.breakpoints,
        textStyles: tokens.textStyles,
      },
    },
  });
}

export default presetMaterialTokens;
