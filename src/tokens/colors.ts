import {
  CorePalette,
  hexFromArgb,
  type Theme,
  type TonalPalette,
} from "@material/material-color-utilities";
import type { Tokens } from "@pandacss/dev";
import { kebab } from "../utils/kabab_case";

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
function paletteColors(palette: Record<string, TonalPalette>) {
  const result: Tokens["colors"] = {};

  for (const key in palette) {
    tones.forEach((tone) => {
      result[`${key}-${tone}`] = {
        value: hexFromArgb(palette[key].tone(tone)),
      };
    });
  }

  return result;
}

function schemeColors(scheme: Record<string, number>) {
  const result: Tokens["colors"] = {};

  for (const key in scheme) {
    result[kebab(key)] = { value: hexFromArgb(scheme[key]) };
  }

  return result;
}

export function makeColors(materialTheme: Theme): Tokens["colors"] {
  const schemeLight: Record<string, number> =
    materialTheme.schemes.light.toJSON();
  const schemeDark: Record<string, number> =
    materialTheme.schemes.dark.toJSON();
  const palettes: Record<string, TonalPalette> = materialTheme.palettes;

  materialTheme.customColors.forEach((c) => {
    schemeLight[c.color.name] = c.light.color;
    schemeLight[`on-${c.color.name}`] = c.light.onColor;
    schemeLight[`${c.color.name}-container`] = c.light.colorContainer;
    schemeLight[`on-${c.color.name}-container`] = c.light.onColorContainer;

    schemeDark[c.color.name] = c.dark.color;
    schemeDark[`on-${c.color.name}`] = c.dark.onColor;
    schemeDark[`${c.color.name}-container`] = c.dark.colorContainer;
    schemeDark[`on-${c.color.name}-container`] = c.dark.onColorContainer;

    palettes[c.color.name] = CorePalette.of(c.value).a1;
  });

  return {
    ...paletteColors(palettes),

    light: schemeColors(schemeLight),
    dark: schemeColors(schemeDark),
  };
}
