import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String9308598',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-12-07T23:19:39.420Z',
      },
    },
    two: {
      data: {
        email: 'String8961308',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-12-07T23:19:39.420Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
