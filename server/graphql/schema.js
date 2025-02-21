export const schema = `#graphql

type User {
  _id: ID!
  username: String!
  email: String!
  phone:String
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
  Todos: [Todo]             # Get all Todos 
  Users: [User]             # Get all Users  //TODO
  userDetails: User   # Get details of a specific User  
  todoDetails(id: ID!): Todo   # Get details of a specific Todo 
}

type Mutation {
  createNewUser(username: String!, email: String!, password: String!): AuthPayload  # Register a new user

  logoutUser: NormalResponse   # Logout function (could return a success message)

  loginUser(email: String!, password: String!): AuthPayload   # Login function

  updateUserDetails( username: String, email: String, phone:String): NormalResponse  # Update user details 

  updateUserPassword(oldPassword:String!, newPassword: String!): NormalResponse  # Update user password

  deleteUserAccount: NormalResponse   # Delete user account

  createNewTodo(title: String!, description: String!): NormalResponse  # Create new Todo   

  deleteTodo(id: ID!): NormalResponse   # Delete a Todo
  
  updateTodo(id: ID!, title: String, description: String, completed: Boolean,dueDate:String): NormalResponse  # Update a Todo   

  chnageTodoStatus(id: ID!,status:String): NormalResponse  # Update a Todo 
}




`;
