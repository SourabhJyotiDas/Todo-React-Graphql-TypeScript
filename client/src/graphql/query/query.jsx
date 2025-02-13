import { gql } from "@apollo/client";

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
`;

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
`;

export const Todos = `#graphql
query Query {
  Todos {
    _id
    title
    description
    status
    dueDate
    createdAt
    updatedAt
  }
}
`;

export const GET_TODO_DETAILS = gql`
query Query($id: ID!) {
  todoDetails(id: $id) {
    title
    description
    status
    dueDate
    createdAt
    updatedAt
  }
}
`;
