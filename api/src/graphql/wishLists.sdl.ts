export const schema = gql`
  type WishList {
    id: Int!
    name: String!
    url: String!
    userId: String!
    user: User!
    order: Int
    eventId: String!
    event: Event!
    siteImage: String
    siteTitle: String
    siteDescription: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    wishLists: [WishList!]! @requireAuth
    wishList(id: Int!): WishList @requireAuth
  }

  input CreateWishListInput {
    name: String!
    url: String!
    userId: String!
    order: Int
    eventId: String!
    siteImage: String
    siteTitle: String
    siteDescription: String
  }

  input UpdateWishListInput {
    name: String
    url: String
    userId: String
    order: Int
    eventId: String
    siteImage: String
    siteTitle: String
    siteDescription: String
  }

  type Mutation {
    createWishList(input: CreateWishListInput!): WishList! @requireAuth
    updateWishList(id: Int!, input: UpdateWishListInput!): WishList!
      @requireAuth
    deleteWishList(id: Int!): WishList! @requireAuth
  }
`
