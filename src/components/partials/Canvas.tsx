import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-dom';

import useGetWindowSize from '../hooks/useGetWindowSize';
import useTrackMousePosition from '../hooks/useTrackMousePosition';

const fragment01 = require('../shaders/Canvas/frag01.glsl');

const shaders = Shaders.create({
  fluid01: {
    frag: GLSL`${fragment01.default}`
  }
});

let payload = 0;

const Canvas: React.FC = () => {
  const { width, height } = useGetWindowSize();
  const { x, y } = useTrackMousePosition();

  // timer for animate
  const requestRef = useRef(0);
  const [timer, setTimer] = useState(0);
  const animate = useCallback(() => {
    payload += 0.018;
    setTimer(payload);
    requestRef.current = window.requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const uniformsParams01 = {
    m: [x, y],
    t: timer,
    r: [width, height]
  }

  return (
    <div className="CanvasWrap">
      <Surface width={width} height={height}>
        <Node
          shader={shaders.fluid01}
          uniforms={{ ...uniformsParams01 }}
        />
      </Surface>
    </div>
  );
}

export default Canvas;