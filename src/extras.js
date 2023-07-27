const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0))

export const duplicateSections = () => {
  window.stroDaw.clickHandler3(
    {},
    document.querySelector('.daw-item-0 .daw-item-top'),
  )
  window.stroDaw.changeSectionsPlus(+100)
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
