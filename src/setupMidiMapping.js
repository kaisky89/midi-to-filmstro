import { throttle } from 'lodash'

const setDomIdToMidiValue = ({ domId, midiValue }) => {
  document.querySelector(`#${domId}`).value = midiValue / 127
}

const THROTTLE_TIME = 200 // in ms

const throttledFunctionMap = {
  'daw-0': throttle(
    (midiValue) => setDomIdToMidiValue({ domId: 'daw-0', midiValue }),
    THROTTLE_TIME,
  ),
  'daw-1': throttle(
    (midiValue) => setDomIdToMidiValue({ domId: 'daw-1', midiValue }),
    THROTTLE_TIME,
  ),
  'daw-2': throttle(
    (midiValue) => setDomIdToMidiValue({ domId: 'daw-2', midiValue }),
    THROTTLE_TIME,
  ),
  audio_slider: throttle(
    (midiValue) => setDomIdToMidiValue({ domId: 'audio_slider', midiValue }),
    THROTTLE_TIME,
  ),
}

export default ({
  momentum = [176, 7],
  depth = [177, 7],
  power = [176, 18],
  volume = [176, 19],
} = {}) => {
  const dawMap = {
    'daw-0': momentum,
    'daw-1': depth,
    'daw-2': power,
    audio_slider: volume,
  }

  navigator.requestMIDIAccess().then((midiAccess) =>
    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = (msg) => {
        for (const [domId, midiData] of Object.entries(dawMap)) {
          if (msg.data[0] === midiData[0] && msg.data[1] === midiData[1]) {
            throttledFunctionMap[domId](msg.data[2])
          }
        }
      }
    }),
  )
}
