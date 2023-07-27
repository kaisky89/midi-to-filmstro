const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0))

export const setupLoop = () => {
  try {
    const { loopStart, loopEnd } = window.stroPlayer.splayer.opts2
    window.Tone.Transport.setLoopPoints(`${loopStart}:0`, `${loopEnd}:0`)
    window.Tone.Transport.loop = true
  } catch (error) {
    console.error(error)
  }
}

const setElementChecked = async (selector, checked) => {
  const element = document.querySelector(selector)
  if (element.checked === checked) return
  element.checked = !checked
  await nextTick()
  element.click()
}

export const startAudition = async () => {
  document.querySelector('.sliders-actions-toggler').click()
  await nextTick()
  setElementChecked('#audition-music', true)
  setElementChecked('#latchmode-toggle', false)
  setElementChecked('#snap-sliders', false)
  window.stroDaw.setPunchAll()
}

export const muteWatermark = () => {
  window.stroPlayer.splayer.watermarkPlayer.mute = true
}

export const hideAnnoyingElements = () => {
  const style = document.createElement('style')
  style.innerHTML = /* css */ `
    .premium-feature-modal { display: none !important; }
    .filmstro-modal-with-logo { display: none !important; }
  `
  document.head.appendChild(style)
}
