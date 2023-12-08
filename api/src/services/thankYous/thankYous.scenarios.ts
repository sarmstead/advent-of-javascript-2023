import type { Prisma, ThankYou } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ThankYouCreateArgs>({
  thankYou: {
    one: {
      data: {
        message: 'String',
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:20.270Z',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
        user: {
          create: {
            email: 'String1114287',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
        toUser: {
          create: {
            email: 'String2737683',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
      },
    },
    two: {
      data: {
        message: 'String',
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:20.270Z',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
        user: {
          create: {
            email: 'String3580066',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
        toUser: {
          create: {
            email: 'String4012456',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:20.270Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ThankYou, 'thankYou'>
