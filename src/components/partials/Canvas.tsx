import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-dom';
import Stats from 'stats.js';

import useGetWindowSize from '../hooks/useGetWindowSize';
import useTrackMousePosition from '../hooks/useTrackMousePosition';

const fragment01 = require('../shaders/Canvas/frag01.glsl');

const shaders = Shaders.create({
  fluid01: {
    frag: GLSL`${fragment01.default}`
  }
});

let payload = 0;

const stats = new Stats();

const Canvas: React.FC = () => {
  const { width, height } = useGetWindowSize();
  const { x, y } = useTrackMousePosition();

  // stats.js
  const mount = useRef<HTMLDivElement>(null);
  stats.showPanel(0);
  mount.current?.appendChild(stats.dom);

  // timer for animate
  const requestRef = useRef(0);
  const [timer, setTimer] = useState(0);
  const animate = useCallback(() => {
    stats.begin();
    payload += 0.018;
    setTimer(payload);
    stats.end();
    requestRef.current = window.requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const uniformsParams01 = {
    mouse: [x, y],
    time: timer,
    resolution: [width, height]
  }

  return (
    <div className="CanvasWrap" ref={mount}>
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