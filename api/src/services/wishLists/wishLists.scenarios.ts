import type { Prisma, WishList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WishListCreateArgs>({
  wishList: {
    one: {
      data: {
        name: 'String',
        url: 'String',
        updatedAt: '2023-12-07T23:20:09.830Z',
        user: {
          create: {
            email: 'String3080195',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:09.830Z',
          },
        },
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:09.830Z',
            updatedAt: '2023-12-07T23:20:09.830Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        url: 'String',
        updatedAt: '2023-12-07T23:20:09.830Z',
        user: {
          create: {
            email: 'String4052285',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-12-07T23:20:09.830Z',
          },
        },
        event: {
          create: {
            name: 'String',
            date: '2023-12-07T23:20:09.830Z',
            updatedAt: '2023-12-07T23:20:09.830Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<WishList, 'wishList'>
