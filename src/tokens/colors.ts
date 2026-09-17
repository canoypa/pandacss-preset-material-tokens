import {
  Blend,
  DynamicColor,
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
  SchemeExpressive,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  TonalPalette,
  hexFromArgb,
} from "@material/material-color-utilities";
import type { SemanticTokens, Tokens } from "@pandacss/dev";

export type CustomColor = {
  name: string;
  value: number;
  blend?: boolean;
};

// The 2025 color spec only covers these variants; the library silently
// falls back to the 2021 spec for the others.
export type SchemeVariant = "tonal-spot" | "vibrant" | "expressive" | "neutral";

export type ColorOptions = {
  sourceColor: number;
  customColors?: CustomColor[];
  variant?: SchemeVariant;
  contrastLevel?: number;
  darkCondition?: string;
};

const schemeClasses = {
  "tonal-spot": SchemeTonalSpot,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  neutral: SchemeNeutral,
} satisfies Record<SchemeVariant, unknown>;

type ColorTokens = NonNullable<Tokens["colors"]>;
type ModeColors = Record<string, { value: string; deprecated?: string }>;
type ColorSemanticTokens = NonNullable<SemanticTokens["colors"]>;

const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
// Only the neutral palette has these extra tones in md.ref.palette.
const neutralTones = [...tones, 4, 6, 12, 17, 22, 24, 87, 92, 94, 96].sort((a, b) => a - b);

function paletteColors(
  name: string,
  palette: TonalPalette,
  paletteTones = tones
): ModeColors {
  const result: ModeColors = {};
  for (const tone of paletteTones) {
    result[`${name}${tone}`] = { value: hexFromArgb(palette.tone(tone)) };
  }
  return result;
}

function schemeColors(scheme: DynamicScheme): ModeColors {
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
    "surface-tint":                   { ...c(mdc.surfaceTint()), deprecated: "Use elevation instead." },
    "primary":                        c(mdc.primary()),
    "on-primary":                     c(mdc.onPrimary()),
    "primary-container":              c(mdc.primaryContainer()),
    "on-primary-container":           c(mdc.onPrimaryContainer()),
    "inverse-primary":                c(mdc.inversePrimary()),
    "primary-fixed":                  c(mdc.primaryFixed()),
    "primary-fixed-dim":              c(mdc.primaryFixedDim()),
    "on-primary-fixed":               c(mdc.onPrimaryFixed()),
    "on-primary-fixed-variant":       c(mdc.onPrimaryFixedVariant()),
    "secondary":                      c(mdc.secondary()),
    "on-secondary":                   c(mdc.onSecondary()),
    "secondary-container":            c(mdc.secondaryContainer()),
    "on-secondary-container":         c(mdc.onSecondaryContainer()),
    "secondary-fixed":                c(mdc.secondaryFixed()),
    "secondary-fixed-dim":            c(mdc.secondaryFixedDim()),
    "on-secondary-fixed":             c(mdc.onSecondaryFixed()),
    "on-secondary-fixed-variant":     c(mdc.onSecondaryFixedVariant()),
    "tertiary":                       c(mdc.tertiary()),
    "on-tertiary":                    c(mdc.onTertiary()),
    "tertiary-container":             c(mdc.tertiaryContainer()),
    "on-tertiary-container":          c(mdc.onTertiaryContainer()),
    "tertiary-fixed":                 c(mdc.tertiaryFixed()),
    "tertiary-fixed-dim":             c(mdc.tertiaryFixedDim()),
    "on-tertiary-fixed":              c(mdc.onTertiaryFixed()),
    "on-tertiary-fixed-variant":      c(mdc.onTertiaryFixedVariant()),
    "error":                          c(mdc.error()),
    "on-error":                       c(mdc.onError()),
    "error-container":                c(mdc.errorContainer()),
    "on-error-container":             c(mdc.onErrorContainer()),

    ...paletteColors("primary", scheme.primaryPalette),
    ...paletteColors("secondary", scheme.secondaryPalette),
    ...paletteColors("tertiary", scheme.tertiaryPalette),
    ...paletteColors("neutral", scheme.neutralPalette, neutralTones),
    ...paletteColors("neutral-variant", scheme.neutralVariantPalette),
    ...paletteColors("error", scheme.errorPalette),
  };
}

function customColors(name: string, scheme: DynamicScheme): ModeColors {
  const mdc = new MaterialDynamicColors();
  const c = (d: DynamicColor) => ({ value: hexFromArgb(d.getArgb(scheme)) });

  return {
    [name]: c(mdc.primary()),
    [`on-${name}`]: c(mdc.onPrimary()),
    [`${name}-container`]: c(mdc.primaryContainer()),
    [`on-${name}-container`]: c(mdc.onPrimaryContainer()),
    ...paletteColors(name, scheme.primaryPalette),
  };
}

function makeScheme(
  { variant = "tonal-spot", contrastLevel = 0 }: ColorOptions,
  color: number,
  isDark: boolean
): DynamicScheme {
  const Scheme = schemeClasses[variant];
  return new Scheme(Hct.fromInt(color), isDark, contrastLevel, "2025", "phone");
}

function makeModeColors(options: ColorOptions, isDark: boolean): ModeColors {
  const result = schemeColors(makeScheme(options, options.sourceColor, isDark));

  for (const custom of options.customColors ?? []) {
    const value = custom.blend
      ? Blend.harmonize(custom.value, options.sourceColor)
      : custom.value;
    Object.assign(
      result,
      customColors(custom.name, makeScheme(options, value, isDark))
    );
  }

  return result;
}

export function makeColors(options: ColorOptions): {
  tokens: ColorTokens;
  semanticTokens: ColorSemanticTokens;
} {
  const light = makeModeColors(options, false);
  const dark = makeModeColors(options, true);
  const darkCondition = options.darkCondition ?? "_osDark";

  const semanticTokens: ColorSemanticTokens = {};
  for (const [name, { deprecated }] of Object.entries(light)) {
    semanticTokens[name] = {
      value: {
        base: `{colors.md.light.${name}}`,
        [darkCondition]: `{colors.md.dark.${name}}`,
      },
      // Panda's token walker crashes on an explicit `deprecated: undefined`.
      ...(deprecated && { deprecated }),
    };
  }

  return { tokens: { md: { light, dark } }, semanticTokens: { md: semanticTokens } };
}
