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

export const createTodo = `#graphql
mutation Mutation($title: String!, $description: String!) {
  createNewTodo(title: $title, description: $description) {
    success
    message
  }
}
`;

export const UPDATE_TODO_STATUS = `#graphql
mutation Mutation($chnageTodoStatusId: ID!, $status: String) {
  chnageTodoStatus(id: $chnageTodoStatusId, status: $status) {
    success
    message
  }
}
`;

export const UPDATE_TODO = `#graphql
mutation Mutation($title: String, $description: String, $id: ID!, $dueDate: String) {
  updateTodo(title: $title, description: $description, id: $id, dueDate: $dueDate) {
    success
    message
  }
}
`;

export const DELETE_TODO = `#graphql
mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    success
    message
  }
}
`;

export const UPDATE_USER_DETAILS = `#graphql
mutation Mutation( $phone: String, $email: String, $username: String) {
  updateUserDetails(phone: $phone, email: $email, username: $username) {
    success
    message
  }
}
`;

export const UPDATE_USER_PASSWORD = `#graphql
mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {
  updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    success
    message
  }
}
`;
