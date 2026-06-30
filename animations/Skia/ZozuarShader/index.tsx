import React from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClock,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

const effect = Skia.RuntimeEffect.Make(`
uniform float2 resolution;
uniform float time;

half4 main(vec2 FC) {
    vec4 o = vec4(0.0);

    vec2 p = vec2(0.0);
    vec2 c = p;
    vec2 u = FC * 2.0 - resolution;

    float a;

    for (float i = 0.0; i < 400.0; i++) {

        a = i / 200.0 - 1.0;

        p = cos(
              i * 2.4 +
              time +
              vec2(0.0, 11.0)
            ) * sqrt(1.0 - a * a);

        c = u / resolution.y +
            vec2(p.x, a) / (p.y + 2.0);

        o +=
          (cos(i + vec4(0.0, 2.0, 4.0, 0.0)) + 1.0)
          / dot(c, c)
          * (1.0 - p.y)
          / 30000.0;
    }

    return half4(o.rgb, 1.0);
}
`)!;

export default function ZozuarShader() {
  const { width, height } = useWindowDimensions();

  const clock = useClock();

  const uniforms = useDerivedValue(() => ({
    resolution: [width, height],
    time: clock.value / 1000,
  }));

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={effect} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}
