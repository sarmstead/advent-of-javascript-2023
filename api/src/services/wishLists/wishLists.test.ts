import type { WishList } from '@prisma/client'

import {
  wishLists,
  wishList,
  createWishList,
  updateWishList,
  deleteWishList,
} from './wishLists'
import type { StandardScenario } from './wishLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('wishLists', () => {
  scenario('returns all wishLists', async (scenario: StandardScenario) => {
    const result = await wishLists()

    expect(result.length).toEqual(Object.keys(scenario.wishList).length)
  })

  scenario('returns a single wishList', async (scenario: StandardScenario) => {
    const result = await wishList({ id: scenario.wishList.one.id })

    expect(result).toEqual(scenario.wishList.one)
  })

  scenario('creates a wishList', async (scenario: StandardScenario) => {
    const result = await createWishList({
      input: {
        name: 'String',
        url: 'String',
        userId: scenario.wishList.two.userId,
        eventId: scenario.wishList.two.eventId,
        updatedAt: '2023-12-07T23:20:09.815Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.userId).toEqual(scenario.wishList.two.userId)
    expect(result.eventId).toEqual(scenario.wishList.two.eventId)
    expect(result.updatedAt).toEqual(new Date('2023-12-07T23:20:09.815Z'))
  })

  scenario('updates a wishList', async (scenario: StandardScenario) => {
    const original = (await wishList({
      id: scenario.wishList.one.id,
    })) as WishList
    const result = await updateWishList({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a wishList', async (scenario: StandardScenario) => {
    const original = (await deleteWishList({
      id: scenario.wishList.one.id,
    })) as WishList
    const result = await wishList({ id: original.id })

    expect(result).toEqual(null)
  })
})
