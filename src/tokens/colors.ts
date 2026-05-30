import {
  Blend,
  DynamicColor,
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  TonalPalette,
  hexFromArgb,
} from "@material/material-color-utilities";
import type { Tokens } from "@pandacss/dev";

export type CustomColor = {
  name: string;
  value: number;
  blend?: boolean;
};

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
function paletteColors(palettes: Record<string, TonalPalette>) {
  const result: Tokens["colors"] = {};

  for (const key in palettes) {
    tones.forEach((tone) => {
      result[`${key}-${tone}`] = {
        value: hexFromArgb(palettes[key].tone(tone)),
      };
    });
  }

  return result;
}

function schemeColors(scheme: SchemeTonalSpot): Tokens["colors"] {
  const mdc = new MaterialDynamicColors();
  const c = (d: DynamicColor) => ({ value: hexFromArgb(d.getArgb(scheme)) });

  return {
    "background":                     c(mdc.background()),
    "on-background":                  c(mdc.onBackground()),
    "surface":                        c(mdc.surface()),
    "surface-dim":                    c(mdc.surfaceDim()),
    "surface-bright":                 c(mdc.surfaceBright()),
    "surface-container-lowest":       c(mdc.surfaceContainerLowest()),
    "surface-container-low":          c(mdc.surfaceContainerLow()),
    "surface-container":              c(mdc.surfaceContainer()),
    "surface-container-high":         c(mdc.surfaceContainerHigh()),
    "surface-container-highest":      c(mdc.surfaceContainerHighest()),
    "on-surface":                     c(mdc.onSurface()),
    "surface-variant":                c(mdc.surfaceVariant()),
    "on-surface-variant":             c(mdc.onSurfaceVariant()),
    "outline":                        c(mdc.outline()),
    "outline-variant":                c(mdc.outlineVariant()),
    "inverse-surface":                c(mdc.inverseSurface()),
    "inverse-on-surface":             c(mdc.inverseOnSurface()),
    "shadow":                         c(mdc.shadow()),
    "scrim":                          c(mdc.scrim()),
    "surface-tint":                   c(mdc.surfaceTint()),
    "primary":                        c(mdc.primary()),
    "primary-dim":                    c(mdc.primaryDim()!),
    "on-primary":                     c(mdc.onPrimary()),
    "primary-container":              c(mdc.primaryContainer()),
    "on-primary-container":           c(mdc.onPrimaryContainer()),
    "inverse-primary":                c(mdc.inversePrimary()),
    "primary-fixed":                  c(mdc.primaryFixed()),
    "primary-fixed-dim":              c(mdc.primaryFixedDim()),
    "on-primary-fixed":               c(mdc.onPrimaryFixed()),
    "on-primary-fixed-variant":       c(mdc.onPrimaryFixedVariant()),
    "secondary":                      c(mdc.secondary()),
    "secondary-dim":                  c(mdc.secondaryDim()!),
    "on-secondary":                   c(mdc.onSecondary()),
    "secondary-container":            c(mdc.secondaryContainer()),
    "on-secondary-container":         c(mdc.onSecondaryContainer()),
    "secondary-fixed":                c(mdc.secondaryFixed()),
    "secondary-fixed-dim":            c(mdc.secondaryFixedDim()),
    "on-secondary-fixed":             c(mdc.onSecondaryFixed()),
    "on-secondary-fixed-variant":     c(mdc.onSecondaryFixedVariant()),
    "tertiary":                       c(mdc.tertiary()),
    "tertiary-dim":                   c(mdc.tertiaryDim()!),
    "on-tertiary":                    c(mdc.onTertiary()),
    "tertiary-container":             c(mdc.tertiaryContainer()),
    "on-tertiary-container":          c(mdc.onTertiaryContainer()),
    "tertiary-fixed":                 c(mdc.tertiaryFixed()),
    "tertiary-fixed-dim":             c(mdc.tertiaryFixedDim()),
    "on-tertiary-fixed":              c(mdc.onTertiaryFixed()),
    "on-tertiary-fixed-variant":      c(mdc.onTertiaryFixedVariant()),
    "error":                          c(mdc.error()),
    "error-dim":                      c(mdc.errorDim()!),
    "on-error":                       c(mdc.onError()),
    "error-container":                c(mdc.errorContainer()),
    "on-error-container":             c(mdc.onErrorContainer()),
  };
}

export function makeColors(
  sourceColor: number,
  customColors: CustomColor[] = []
): Tokens["colors"] {
  const hct = Hct.fromInt(sourceColor);
  const schemeLight = new SchemeTonalSpot(hct, false, 0, "2025", "phone");
  const schemeDark = new SchemeTonalSpot(hct, true, 0, "2025", "phone");

  const palettes: Record<string, TonalPalette> = {
    primary: schemeLight.primaryPalette,
    secondary: schemeLight.secondaryPalette,
    tertiary: schemeLight.tertiaryPalette,
    neutral: schemeLight.neutralPalette,
    "neutral-variant": schemeLight.neutralVariantPalette,
    error: schemeLight.errorPalette,
  };

  const lightCustom: Tokens["colors"] = {};
  const darkCustom: Tokens["colors"] = {};

  customColors.forEach((c) => {
    const value = c.blend ? Blend.harmonize(c.value, sourceColor) : c.value;
    const chct = Hct.fromInt(value);
    const palette = TonalPalette.fromHueAndChroma(
      chct.hue,
      Math.max(48, chct.chroma)
    );

    lightCustom[c.name] = { value: hexFromArgb(palette.tone(40)) };
    lightCustom[`on-${c.name}`] = { value: hexFromArgb(palette.tone(100)) };
    lightCustom[`${c.name}-container`] = {
      value: hexFromArgb(palette.tone(90)),
    };
    lightCustom[`on-${c.name}-container`] = {
      value: hexFromArgb(palette.tone(10)),
    };

    darkCustom[c.name] = { value: hexFromArgb(palette.tone(80)) };
    darkCustom[`on-${c.name}`] = { value: hexFromArgb(palette.tone(20)) };
    darkCustom[`${c.name}-container`] = {
      value: hexFromArgb(palette.tone(30)),
    };
    darkCustom[`on-${c.name}-container`] = {
      value: hexFromArgb(palette.tone(90)),
    };

    palettes[c.name] = palette;
  });

  return {
    ...paletteColors(palettes),

    light: {
      ...schemeColors(schemeLight),
      ...lightCustom,
    },
    dark: {
      ...schemeColors(schemeDark),
      ...darkCustom,
    },
  };
}
