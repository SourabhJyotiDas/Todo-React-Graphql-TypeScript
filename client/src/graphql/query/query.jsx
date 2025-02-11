

export const getUsers = `#graphql
query Query {
  Users {
    username
    email
    phone
    status
    verified
    createdAt
    updatedAt
  }
}
`

export const loggedInUser = `#graphql
query Query {
  userDetails {
    _id
    username
    email
    phone
    status
    verified
    createdAt
    updatedAt
  }
}
`