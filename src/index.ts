import { definePreset, type Preset } from "@pandacss/dev";
import * as tokens from "./tokens";
import type { ColorOptions } from "./tokens/colors";
import type { MotionScheme } from "./tokens/easings";

export type { CustomColor, SchemeVariant } from "./tokens/colors";
export type { MotionScheme } from "./tokens/easings";

export type Options = ColorOptions & {
  motionScheme?: MotionScheme;
};

export function presetMaterialTokens(options: Options): Preset {
  const { motionScheme = "standard" } = options;
  const colors = tokens.makeColors(options);

  return definePreset({
    name: "preset-material-tokens",
    theme: {
      extend: {
        tokens: {
          radii: { md: tokens.radii },
          colors: colors.tokens,
          opacity: { md: tokens.opacity },
          shadows: { md: tokens.shadows },
          durations: { md: tokens.makeDurations(motionScheme) },
          easings: { md: tokens.makeEasings(motionScheme) },
        },
        semanticTokens: {
          colors: colors.semanticTokens,
        },
        breakpoints: tokens.breakpoints,
        textStyles: { md: tokens.textStyles },
      },
    },
  });
}

export default presetMaterialTokens;
