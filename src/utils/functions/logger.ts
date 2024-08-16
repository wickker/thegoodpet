import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, json, prettyPrint } = format

const initLogger = () =>
  createLogger({
    transports: [new transports.Console()],
    format: combine(
      label({ label: 'the-good-pet' }),
      timestamp(),
      json(),
      prettyPrint(),
    ),
  })

export const logger = initLogger()
