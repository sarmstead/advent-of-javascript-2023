import type { Prisma, Pairing } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PairingCreateArgs>({
  pairing: {
    one: {
      data: {
        updatedAt: '2023-12-07T23:20:01.936Z',
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:01.936Z',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
        santa: {
          create: {
            email: 'String4638484',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
        person: {
          create: {
            email: 'String1482585',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-12-07T23:20:01.936Z',
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:01.936Z',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
        santa: {
          create: {
            email: 'String6217335',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
        person: {
          create: {
            email: 'String3760910',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:01.936Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Pairing, 'pairing'>
