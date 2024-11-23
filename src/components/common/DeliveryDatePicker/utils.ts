import { DateTime } from 'luxon'

export const getInitDelieveryDate = () => DateTime.now().plus({ weeks: 1 })
