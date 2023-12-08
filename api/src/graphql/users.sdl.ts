export const schema = gql`
  type User {
    id: String!
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
    role: Role
    status: [UserStatus]!
    santa: [Pairing]!
    person: [Pairing]!
    wishList: [WishList]!
    thankYouUserFrom: [ThankYou]!
    thankYouUserTo: [ThankYou]!
  }

  enum Role {
    ADMIN
    USER
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    firstName: String
    lastName: String
    avatar: String
    role: Role
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    avatar: String
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
