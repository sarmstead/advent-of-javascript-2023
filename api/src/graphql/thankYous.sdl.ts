export const schema = gql`
  type ThankYou {
    id: String!
    eventId: String!
    event: Event!
    userId: String!
    user: User!
    toUserId: String!
    toUser: User!
    message: String!
    createdAt: DateTime!
  }

  type Query {
    thankYous: [ThankYou!]! @requireAuth
    thankYou(id: String!): ThankYou @requireAuth
  }

  input CreateThankYouInput {
    eventId: String!
    userId: String!
    toUserId: String!
    message: String!
  }

  input UpdateThankYouInput {
    eventId: String
    userId: String
    toUserId: String
    message: String
  }

  type Mutation {
    createThankYou(input: CreateThankYouInput!): ThankYou! @requireAuth
    updateThankYou(id: String!, input: UpdateThankYouInput!): ThankYou!
      @requireAuth
    deleteThankYou(id: String!): ThankYou! @requireAuth
  }
`
