import mitt from 'mitt'
// import { console } from './console'
import { round } from 'lodash'

/**
 * @typedef {"momentum"} CONTROL_MOMENTUM
 */
/**
 * @typedef {"depth"} CONTROL_DEPTH
 */
/**
 * @typedef {"power"} CONTROL_POWER
 */
/**
 * @typedef {"volume"} CONTROL_VOLUME
 */
/**
 * @typedef {[number, number]} MidiTuple
 */

/**
 * Controls that can be used in the MidiMapper
 * @readonly
 * @enum {CONTROL_MOMENTUM|CONTROL_DEPTH|CONTROL_POWER|CONTROL_VOLUME}
 */
export const CONTROLS = {
  MOMENTUM: 'momentum',
  DEPTH: 'depth',
  POWER: 'power',
  VOLUME: 'volume',
}

const controlDomMap = {
  momentum: 'daw-0',
  depth: 'daw-1',
  power: 'daw-2',
  volume: 'audio_slider',
}

const controlRecordSectionsMap = {
  momentum: 0,
  depth: 1,
  power: 2,
}

const localStorageManager = {
  save: (obj) => {
    localStorage.midiMapper = JSON.stringify(obj)
  },
  load: () => {
    const loadedObj = JSON.parse(localStorage.midiMapper || 'false')
    if (!loadedObj) return
    if (Object.values(CONTROLS).some((CONTROL) => !loadedObj[CONTROL])) return
    return loadedObj
  },
}

export class MidiMapper {
  constructor() {
    this.emitter = mitt()
    this.initMidiListener()
    const setupMap = localStorageManager.load()
    if (setupMap) this.setupMidiMappingAll(setupMap)
  }

  async initMidiListener() {
    const midiAccess = await navigator.requestMIDIAccess()
    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = (msg) => {
        this.emitter.emit(`${msg.data[0]}-${msg.data[1]}`, msg)
      }
    })
  }

  /**
   * Send the control command to the player
   * @param {CONTROLS} CONTROL which control to set
   * @param {number} value the value it should receive (0-127)
   */
  sendControl(CONTROL, value) {
    const domElement = document.querySelector(`#${controlDomMap[CONTROL]}`)
    domElement.value = round(value / 127, 2)
    if (CONTROL === CONTROLS.VOLUME) {
      window.stroDaw.setVolume(domElement.value)
    } else {
      window.stroDaw.recordSections(
        controlRecordSectionsMap[CONTROL],
        domElement,
      )
    }
  }

  setupMidiMappingAll(
    setupMap = {
      [CONTROLS.MOMENTUM]: [176, 7],
      [CONTROLS.DEPTH]: [177, 7],
      [CONTROLS.POWER]: [176, 18],
      [CONTROLS.VOLUME]: [176, 19],
    },
  ) {
    this.emitter.all.clear()
    for (const [CONTROL, tuple] of Object.entries(setupMap)) {
      this.emitter.on(`${tuple[0]}-${tuple[1]}`, (msg) =>
        this.sendControl(CONTROL, msg.data[2]),
      )
    }
    this.setupMap = setupMap
    localStorageManager.save(setupMap)
  }

  /**
   * Setup a mapping of just one control
   * @param {CONTROLS} CONTROL Which control to setup
   * @param {MidiTuple} tuple MidiTuple that should be connected with the control
   */
  setupMidiMappingSingle(CONTROL, tuple) {
    const newSetupMap = {
      ...this.setupMap,
      [CONTROL]: tuple,
    }
    this.setupMidiMappingAll(newSetupMap)
  }

  get hasSetupMap() {
    return !!this.setupMap
  }
}

export default new MidiMapper()
