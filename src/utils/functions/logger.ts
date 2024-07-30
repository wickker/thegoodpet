import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label } = format

const initLogger = () =>
  createLogger({
    transports: [new transports.Console()],
    format: combine(
      label({ label: 'the-good-pet' }),
      timestamp(),
      format.json(),
    ),
  })

export const logger = initLogger()

// Basic usage:
// logger.info({message: 'info'})
// logger.error({message: 'error'})
// logger.warn({message: 'warn'})
