export const duplicateSections = () => {
  window.stroDaw.clickHandler3(
    {},
    document.querySelector('.daw-item-0 .daw-item-top'),
  )
  window.stroDaw.changeSectionsPlus(+100)
}

export const startAudition = () => {
  const auditionCheckmarkElement = document.querySelector('#audition-music')
  if (auditionCheckmarkElement.checked) return
  auditionCheckmarkElement.checked = true
  window.stroDaw.setPunchAll()
}

export const muteWatermark = () => {
  window.stroPlayer.splayer.watermarkPlayer.mute = true
}
