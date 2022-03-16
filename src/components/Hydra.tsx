import React, { useEffect, useLayoutEffect, useRef } from 'react'
//@ts-ignore
import HydraSynth from 'hydra-synth'

type Props = {}

const Hydra: React.FC<Props> = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const hydra = new HydraSynth({
      canvas: null, // canvas element to render to. If none is supplied, a canvas will be created and appended to the screen

      autoLoop: true, // if true, will automatically loop using requestAnimationFrame.If set to false, you must implement your own loop function using the tick() method (below)

      makeGlobal: true, // if false, will not pollute global namespace

      numSources: 4, // number of source buffers to create initially

      detectAudio: true,

      numOutputs: 4, // number of output buffers to use. Note: untested with numbers other than 4. render() method might behave unpredictably

      extendTransforms: [], // An array of transforms to be added to the synth, or an object representing a single transform

      precision: 'mediump' // precision of shaders, can also be 'highp'
    })

    // by default, hydra makes everything global.
    // see options to change parameters
    osc(40, 0.1, 0.9).out()
  }, [])
  return <canvas ref={canvas} id="canvas"></canvas>
}

export default Hydra
