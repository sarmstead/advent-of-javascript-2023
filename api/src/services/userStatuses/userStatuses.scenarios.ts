import type { Prisma, UserStatus } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserStatusCreateArgs>({
  userStatus: {
    one: {
      data: {
        status: 'INVITED',
        user: {
          create: {
            email: 'String666638',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:19:46.102Z',
          },
        },
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:19:46.102Z',
            updatedAt: '2023-12-07T23:19:46.102Z',
          },
        },
      },
    },
    two: {
      data: {
        status: 'INVITED',
        user: {
          create: {
            email: 'String5214648',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:19:46.102Z',
          },
        },
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:19:46.102Z',
            updatedAt: '2023-12-07T23:19:46.102Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserStatus, 'userStatus'>
