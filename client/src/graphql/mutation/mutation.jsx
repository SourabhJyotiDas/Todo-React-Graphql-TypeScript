export const register = `#graphql
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createNewUser(username: $username, email: $email, password: $password) {
    message
    user {
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
}
`;

export const login = `#graphql
mutation Mutation($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    message
    user {
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
}`;

export const logout = `#graphql
mutation Mutation {
  logoutUser {
    success
    message
  }
}`;

export const deleteAccount = `#graphql
mutation DeleteUserAccount {
  deleteUserAccount {
    success
    message
  }
}`;
