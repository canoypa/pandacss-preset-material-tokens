import { definePreset, type Preset } from "@pandacss/dev";
import * as tokens from "./tokens";
import type { ColorOptions } from "./tokens/colors";
import type { MotionScheme } from "./tokens/easings";
import type { LanguageHeight, Typeface } from "./tokens/text_styles";

export type { CustomColor, SchemeVariant } from "./tokens/colors";
export type { MotionScheme } from "./tokens/easings";
export type { LanguageHeight, Typeface } from "./tokens/text_styles";

export type Options = ColorOptions & {
  motionScheme?: MotionScheme;
  languageHeight?: LanguageHeight;
  typeface?: Typeface;
};

export function presetMaterialTokens(options: Options): Preset {
  const { motionScheme = "standard", languageHeight = "medium", typeface = {} } = options;
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
          spacing: { md: tokens.spacing },
          borderWidths: { md: tokens.borderWidths },
          durations: { md: tokens.makeDurations(motionScheme) },
          easings: { md: tokens.makeEasings(motionScheme) },
          fonts: { md: tokens.makeFonts(typeface) },
          fontWeights: { md: tokens.fontWeights },
        },
        semanticTokens: {
          colors: colors.semanticTokens,
        },
        breakpoints: tokens.breakpoints,
        textStyles: tokens.makeTextStyles(languageHeight, typeface),
      },
    },
  });
}

export default presetMaterialTokens;
