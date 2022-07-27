import './console'
import { MidiLearner } from './MidiLearner'
import midiMapper from './midiMapper'

const midiLearner = new MidiLearner(midiMapper)

if (!midiMapper.hasSetupMap) midiLearner.learn()
