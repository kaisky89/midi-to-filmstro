import './console'
import { duplicateSections, muteWatermark, startAudition } from './extras'
import { MidiLearner } from './MidiLearner'
import midiMapper from './midiMapper'

const midiLearner = new MidiLearner(midiMapper)

const run = async () => {
  if (!midiMapper.hasSetupMap) await midiLearner.learn()

  duplicateSections()
  startAudition()
  muteWatermark()
}
run()
