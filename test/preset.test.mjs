import { test } from "node:test";
import presetMaterialTokens from "../dist/index.mjs";

test("preset output", (t) => {
  const preset = presetMaterialTokens({
    sourceColor: 0x8282f4,
    customColors: [
      { name: "info", value: 0x42a5f5, blend: true },
      { name: "warning", value: 0xffee58 },
      { name: "success", value: 0x66bb6a, fidelity: true },
    ],
  });
  t.assert.snapshot(preset);
});

test("options", (t) => {
  const preset = presetMaterialTokens({
    sourceColor: 0x8282f4,
    variant: "expressive",
    contrastLevel: 0.5,
    darkCondition: "_dark",
    motionScheme: "expressive",
    languageHeight: "small",
    typeface: { brand: "Comfortaa, sans-serif", plain: "Roboto, sans-serif" },
    customColors: [
      { name: "info", value: 0x42a5f5 },
      { name: "success", value: 0x66bb6a, fidelity: true },
    ],
  });
  const { tokens, semanticTokens } = preset.theme.extend;
  t.assert.snapshot({
    primary: [tokens.colors.md.light.primary, tokens.colors.md.dark.primary],
    semantic: semanticTokens.colors.md.primary,
    spring: [tokens.easings.md.spring, tokens.durations.md.spring],
    fonts: tokens.fonts,
    customColors: ["info", "info-container", "success", "success-container"].map(
      (name) => [tokens.colors.md.light[name], tokens.colors.md.dark[name]]
    ),
    textStyle: [
      "md.title-large",
      "md.body-large",
      "md.emphasized.display-large",
      "md.variable.body-medium",
      "md.variable.emphasized.label-large",
    ].map((name) => preset.theme.extend.textStyles[name]),
  });
});

test("invalid input", (t) => {
  const make = (options) => () => presetMaterialTokens({ sourceColor: 0x8282f4, ...options });
  const invalid = [
    { customColors: [{ name: "brand", value: 0xff0000 }, { name: "brand2", value: 0x00ff00 }] },
    { customColors: [{ name: "surface", value: 0xff0000 }] },
    { customColors: [{ name: "blue", value: 0x2196f3 }, { name: "light-blue", value: 0x03a9f4 }] },
    { customColors: [{ name: "a}b", value: 0xff0000 }] },
    { variant: "fidelity" },
    { motionScheme: "fast" },
    { languageHeight: "extraLarge" },
  ];
  for (const options of invalid) t.assert.throws(make(options));
});
