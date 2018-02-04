module.exports = `
	type User {
		id: ID
		fullname: String
		email: String
		bio: String
		shareditems: [Item]
		borroweditems: [Item]
	}
  type Item {
    id: ID
    created: String
    imageurl: String
    title: String
    itemowner: User
    borrower: User
    itemurl: String
    description: String
    available: Boolean
    tags: [Tag]
  }   
	type Tag {
		id: ID
		title: String
  }
  

	input AddItemInput {
		imageurl: String
		itemowner: ID
		title: String
		description: String
		tags: [TagInput]
	}
	input TagInput {
		id: ID
		title: String
	}
	input UpdateItemInput {
		id: ID
		borrower: [BorrowerInput]
	}
	input BorrowerInput {
		id: ID
  }
  
  
	type Mutation {
		updateItem(updatedItem: UpdateItemInput): Item
		createNewItem(newItem: AddItemInput): Item
	}
	type Query {
		items: [Item]
		users: [User]
		user(id: ID): User
		item(id: ID): Item
	}
`;