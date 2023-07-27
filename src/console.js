const { log, warn, debug, error } = window.console

window.console = {
  ...window.console,
  log: () => {},
  warn: () => {},
  debug: () => {},
  error: () => {},
}

export const console = { log, warn, debug, error }
