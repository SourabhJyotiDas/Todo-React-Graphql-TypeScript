export const schema = `#graphql

type User {
  _id: ID!
  username: String!
  email: String!
  phone:Int
  status: String!
  verified: Boolean
  createdAt: String!,
  updatedAt: String!,
}

type Todo {
  _id: ID!
  user: User!
  title: String!
  description: String!
  status: String!
  dueDate:String!
  createdAt: String!,
  updatedAt: String!,
}

type AuthPayload {
  message:String!
  user: User!
}

type NormalResponse {
  success:Boolean!
  message:String!
}




type Query {
  Todos: [Todo]             # Get all Todos  //TODO
  Users: [User]             # Get all Users  //TODO
  userDetails: User   # Get details of a specific User  
  todoDetails(id: ID!): Todo   # Get details of a specific Todo   //TODO
}

type Mutation {
  createNewUser(username: String!, email: String!, password: String!): AuthPayload  # Register a new user

  logoutUser: NormalResponse   # Logout function (could return a success message)

  loginUser(email: String!, password: String!): AuthPayload   # Login function

  updateUserDetails(id: ID!, username: String, email: String): NormalResponse  # Update user details  //TODO

  updateUserPassword(id: ID!, newPassword: String!): NormalResponse  # Update user password     //TODO

  deleteUserAccount: NormalResponse   # Delete user account

  createNewTodo(title: String!, description: String!): NormalResponse  # Create new Todo    //TODO

  deleteTodo(id: ID!): NormalResponse   # Delete a Todo     //TODO
  
  updateTodo(id: ID!, title: String, description: String, completed: Boolean): NormalResponse  # Update a Todo    //TODO
}




`;
