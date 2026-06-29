import React from 'react';
import { Dimensions } from 'react-native';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClock,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const effect = Skia.RuntimeEffect.Make(`
uniform float2 resolution;
uniform float time;

const int iterations = 10;
const float formuparam = 0.53;

const int volsteps = 12;
const float stepsize = 0.1;

const float zoom = 0.8;
const float tile = 0.85;
const float speed = 0.01;

const float brightness = 0.0015;
const float darkmatter = 0.3;
const float distfading = 0.73;
const float saturation = 0.85;

half4 main(vec2 fragCoord) {

    vec2 uv = fragCoord / resolution - 0.5;
    uv.y *= resolution.y / resolution.x;

    vec3 dir = vec3(uv * zoom, 1.0);

    float t = time * speed + 0.25;

    vec3 from = vec3(1.0, 0.5, 0.5);
    from += vec3(t * 2.0, t, -2.0);

    float s = 0.1;
    float fade = 1.0;

    vec3 v = vec3(0.0);

    for (int r = 0; r < volsteps; r++) {

        vec3 p = from + s * dir * 0.5;

        p = abs(vec3(tile) - mod(p, vec3(tile * 2.0)));

        float pa = 0.0;
        float a = 0.0;

        for (int i = 0; i < iterations; i++) {
            p = abs(p) / dot(p, p) - formuparam;
            a += abs(length(p) - pa);
            pa = length(p);
        }

        float dm = max(0.0, darkmatter - a * a * 0.001);

        a *= a * a;

        if (r > 6) {
            fade *= 1.0 - dm;
        }

        v += vec3(fade);

        v += vec3(
            s,
            s * s,
            s * s * s * s
        ) * a * brightness * fade;

        fade *= distfading;
        s += stepsize;
    }

    v = mix(vec3(length(v)), v, saturation);

    return half4(v * 0.01, 1.0);
}
`)!;

function StarNest() {
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

export default StarNest;
