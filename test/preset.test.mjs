import { test } from "node:test";
import presetMaterialTokens from "../dist/index.mjs";

test("preset output", (t) => {
  const preset = presetMaterialTokens({
    sourceColor: 0x8282f4,
    customColors: [
      { name: "info", value: 0x42a5f5, blend: true },
      { name: "warning", value: 0xffee58 },
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
  });
  const { tokens, semanticTokens } = preset.theme.extend;
  t.assert.snapshot({
    primary: [tokens.colors.md.light.primary, tokens.colors.md.dark.primary],
    semantic: semanticTokens.colors.md.primary,
    spring: [tokens.easings.md.spring, tokens.durations.md.spring],
  });
});
