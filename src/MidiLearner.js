import { console } from './console'
import { CONTROLS } from './midiMapper'
import { debounce } from 'lodash'

export class MidiLearner {
  /** @param {import('./midiMapper').MidiMapper} midiMapper */
  constructor (midiMapper) {
    this.midiMapper = midiMapper
  }

  async learn () {
    for (const CONTROL of Object.keys(CONTROLS)) {
      console.log(`Now move the controller for ${CONTROL}`)
      const tuple = await this.listenForController()
      this.midiMapper.setupMidiMappingSingle(CONTROLS[CONTROL], tuple)
    }
    console.log('Learning is done ☑️')
  }

  listenForController () {
    return new Promise((resolve) => {
      const debouncedListener = debounce((key, msg) => {
        this.midiMapper.emitter.off('*', debouncedListener)
        resolve([msg.data[0], msg.data[1]])
      }, 1000)
      this.midiMapper.emitter.on('*', debouncedListener)
    })
  }
}
