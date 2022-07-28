# midi-to-filmstro

> A simple tool to use midi controllers in the web editor of filmstro.com

## Requirements
- A Browser that has Midi Support (tested with Chrome)
- Some kind of midi controller, that has at least 4 different controls

## Usage

- Plug in your midi controller to your computer
- Go to the web editor of filmstro with a song selected, e.g. [https://app.filmstro.com/?name=neblina](https://app.filmstro.com/?name=neblina)
- Login if needed
- Open the console in your browser and type this command

```js
import('https://kaisky89.github.io/midi-to-filmstro/main.js')
```

- On the first run, you will be guided through a small setup routine in the console to get the midi mapping up & running (it will save the mapping for all future sessions)
- After the setup routine, audition mode will start automatically and you should be able to move the controls using your midi controller

## Trouble shooting

- Make sure that your Midi controller sends on different CC per controller
- If you need to reset the midi mapping:

```js
localStorage.removeItem('midiMapper')
```

