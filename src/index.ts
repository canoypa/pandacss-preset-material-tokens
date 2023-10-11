import {
  themeFromSourceColor,
  type CustomColor,
} from "@material/material-color-utilities";
import { definePreset, type Preset } from "@pandacss/dev";
import * as tokens from "./tokens";

export type Options<T extends CustomColor> = {
  sourceColor: number;
  customColors?: T[];
};

export function presetMaterialTokens<T extends CustomColor>({
  sourceColor,
  customColors,
}: Options<T>): Preset {
  const materialTheme = themeFromSourceColor(sourceColor, customColors);

  return definePreset({
    theme: {
      extend: {
        tokens: {
          radii: tokens.radii,
          colors: tokens.makeColors(materialTheme),
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
