export const schema = gql`
  type UserStatus {
    id: Int!
    userId: String!
    user: User!
    status: Status!
    eventId: String!
    event: Event!
  }

  enum Status {
    INVITED
    DECLINED
    ACCEPTED
  }

  type Query {
    userStatuses: [UserStatus!]! @requireAuth
    userStatus(id: Int!): UserStatus @requireAuth
  }

  input CreateUserStatusInput {
    userId: String!
    status: Status!
    eventId: String!
  }

  input UpdateUserStatusInput {
    userId: String
    status: Status
    eventId: String
  }

  type Mutation {
    createUserStatus(input: CreateUserStatusInput!): UserStatus! @requireAuth
    updateUserStatus(id: Int!, input: UpdateUserStatusInput!): UserStatus!
      @requireAuth
    deleteUserStatus(id: Int!): UserStatus! @requireAuth
  }
`
