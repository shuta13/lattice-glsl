import React from 'react';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-dom';

import useGetWindowSize from '../hooks/useGetWindowSize';

const shaders = Shaders.create({
  helloGLSL: {
    frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform float blue;
        void main() {
        gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
      }
    `
  }
});

const Canvas: React.FC = () => {
  const { width, height } = useGetWindowSize();
  return (
    <div className="CanvasWrap">
      <Surface width={width} height={height}>
        <Node shader={shaders.helloGLSL} />
      </Surface>
    </div>
  );
}

export default Canvas;