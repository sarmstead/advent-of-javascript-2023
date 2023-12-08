import type { Prisma, Event } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        name: 'String',
        date: '2023-12-07T23:19:54.812Z',
        updatedAt: '2023-12-07T23:19:54.812Z',
      },
    },
    two: {
      data: {
        name: 'String',
        date: '2023-12-07T23:19:54.812Z',
        updatedAt: '2023-12-07T23:19:54.812Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
