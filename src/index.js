import './console'
import { muteWatermark, setupLoop, startAudition } from './extras'
import { MidiLearner } from './MidiLearner'
import midiMapper from './midiMapper'

const midiLearner = new MidiLearner(midiMapper)

const run = async () => {
  if (!midiMapper.hasSetupMap) await midiLearner.learn()

  setupLoop()
  startAudition()
  muteWatermark()
}
run()
