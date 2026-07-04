import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, Fill, Shader, Skia, vec } from '@shopify/react-native-skia';

const source = Skia.RuntimeEffect.Make(`
  uniform float4 colors[4];
  uniform float2 center;

  struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
  };

  float sdCircle(vec2 xy, float radius) {
  return length(xy) - radius;
  }

  float4 drawCircle(float4 color, float2 pos,float radius, Paint paint) {
    float d = sdCircle(pos, radius);
    bool isFill = paint.stroke == false && d < 0;
    bool isStroke = paint.stroke == true && abs(d) <= paint.strokeWidth/2;
    if(isFill || isStroke) {
      return paint.color;
    }
    return color;
  }

  vec4 main(vec2 xy) {
    float strokeWidth = 20;
    float radius = center.x - strokeWidth/2;

    float4 color = colors[1];

    color = drawCircle(color, xy-center, radius, Paint(colors[2], false, 0));
    return color;
  }`)!;

const colors = ['#dafb61', '#61DAFB', '#fb61da', '#61fbcf'].map(c =>
  Skia.Color(c),
);

const SDF = () => {
  const { width, height } = useWindowDimensions();
  const center = vec(width / 2, height / 2);

  return (
    <Canvas style={styles.container}>
      <Fill>
        <Shader source={source} uniforms={{ colors, center }} />
      </Fill>
    </Canvas>
  );
};

export default SDF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//  float d = sdCircle(xy-center, radius);

//     if(abs(d) <= strokeWidth/2) {
//       return colors[0];
//     } else if(d < 0) {
//       return colors[2];
//     }
