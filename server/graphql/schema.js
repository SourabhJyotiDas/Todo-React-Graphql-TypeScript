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



type Query{
  Todos(id:ID!):[Todo]
  Users:[User]
  #  post(id:ID!):Post
}

# type Mutation {
#   createNewUser(name:String!, email:String!, password:String!):String
# }




`;
