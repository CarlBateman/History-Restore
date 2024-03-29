﻿<script type="application/fragmentShader" id="fragmentShaderCode">
  precision mediump float;
  varying vec2 vUV;
  uniform sampler2D textureSampler;

  //float b[1] = {{3.}};
  float a[100];// = float[](3., 1., 1.);

  void main(void) {
  gl_FragColor = texture2D(textureSampler, vUV);

  float t1 = gl_FragColor.r + gl_FragColor.g + gl_FragColor.b;
  t1 /= 3.;
  float t2 = gl_FragColor.r *.3 + gl_FragColor.g*.59 + gl_FragColor.b*.11;

  if(vUV.x < (vUV.y + .5 ))
  gl_FragColor.rgb = vec3(1. - t1);

  vec4 result;
  int r = 1;
  int c = 10;
  int d = 0;

  //result = texture2D(textureSampler, vUV);d++;

  for(int i = -r; i < r; i++) {
  for(int j = -c; j < c; j++){
  result += texture2D(textureSampler, vUV + vec2(float(i+j)*.009, float(j)*.009));d++;
  }
  }

  vec4 t3 = texture2D(textureSampler, vUV);
  vec4 t4 = texture2D(textureSampler, vUV + .009);
  vec4 t5 = texture2D(textureSampler, vUV - .009);
  vec4 t6 = texture2D(textureSampler, vUV + vec2(-.009, .009));
  vec4 t7 = texture2D(textureSampler, vUV + vec2(.009, -.009));
  gl_FragColor = (t3 + t4 + t5 + t6 + t7) / 5.;
  gl_FragColor = result / float(d);
  //gl_FragColor.rgb = normalize(result.rgb);
  //gl_FragColor = normalize(result);

  /*if(t3.b >= t3.g)
  t4.g = 0.;
  if(t3.g >= t3.r)
  t4.r = 0.;
  if(t3.r >= t3.b)
  t4.b = 0.;*/

  //vec4 t = texture2D(textureSampler, vUV + .01) / 2.;
  //gl_FragColor = t4;
  gl_FragColor.a = 1.;
  int a = 1 ^ 2;
  }
</script>