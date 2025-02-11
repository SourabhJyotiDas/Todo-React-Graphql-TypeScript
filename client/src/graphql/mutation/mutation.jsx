export const createUser = `#graphql
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createNewUser(username: $username, email: $email, password: $password) {
    success
    message
  }
}`;

export const logout = `#graphql
mutation Mutation {
  logoutUser {
    success
    message
  }
}
`;
