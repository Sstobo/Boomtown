module.exports = `
type Tag {
  title: String
  id: ID
}
type User {
  email: String
  fullname: String
  id: ID
  bio: String
  imageurl: String
  shareditems: [Item]
}
  
type Item {
  title: String
  id: ID
  itemowner: User
  borrower: User
  imageurl: String
  description: String
  available: Boolean
  created: String
  tags: [Tag]  
}
input TagInput {
  id: ID
  title: String
}
input AddItemInput{
  imageurl: String
  title: String
  description: String
  itemowner: ID
  tags: [TagInput]
}
input EnterItemInput{
  title: String
  itemowner: String
  description: String
}
input UpdateBorrowerInput {
  available: Boolean
  borrower: String
}
type Mutation {
  createNewItem(newItem: AddItemInput): Item
  updateItem(enterItem: EnterItemInput): Item
  updateBorrower(newBorrower: UpdateBorrowerInput): Item
   
}
type Query {
  items: [Item]
  users: [User]
  user(id: ID): User 
  item(id: ID): Item
  
  
}
`;