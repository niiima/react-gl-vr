import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'
import useInterval from './hooks/useInterval'
import myShader from '../shaders'
import TimeLoop from './TimeLoop'

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  },
  hydra: {
    vert: GLSL`precision mediump float;
    attribute vec2 position;
    varying vec2 uv;
  
    void main () {
      uv = position;
      gl_Position = vec4(2.0 * position - 1.0, 0, 1);
    }`,
    frag: myShader.stripes
  },
  hydraWave: {
    vert: GLSL`precision mediump float;
    attribute vec2 position;
    varying vec2 uv;
  
    void main () {
      uv = position;
      gl_Position = vec4(2.0 * position - 1.0, 0, 1);
    }`,
    frag: myShader.waveStripes
  },
  waveSand: {
    vert: GLSL`precision mediump float;
    attribute vec2 position;
    varying vec2 uv;
  
    void main () {
      uv = position;
      gl_Position = vec4(2.0 * position - 1.0, 0, 1);
    }`,
    frag: myShader.waveSand
  }
})

type Props = {
  time: number
}

/**
 * uniform float time;
uniform vec2 resolution;
varying vec2 uv;
uniform sampler2D prevBuffer;
 */

const GL: React.FC<Props> = ({ time }) => {
  return (
    <Surface width={window.innerWidth} height={window.innerHeight}>
      <Node
        shader={shaders.hydraWave}
        uniforms={{
          time: time * 0.001,
          angle1: time * 0.0001,
          scrollX0: time * 0.0001,
          resolution: [
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio
          ]
        }}
      />
    </Surface>
  )
}

export default TimeLoop(GL)
