export const schema = gql`
  type Pairing {
    id: Int!
    eventId: String!
    event: Event!
    santaId: String!
    santa: User!
    personId: String!
    person: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    pairings: [Pairing!]! @requireAuth
    pairing(id: Int!): Pairing @requireAuth
  }

  input CreatePairingInput {
    eventId: String!
    santaId: String!
    personId: String!
  }

  input UpdatePairingInput {
    eventId: String
    santaId: String
    personId: String
  }

  type Mutation {
    createPairing(input: CreatePairingInput!): Pairing! @requireAuth
    updatePairing(id: Int!, input: UpdatePairingInput!): Pairing! @requireAuth
    deletePairing(id: Int!): Pairing! @requireAuth
  }
`
