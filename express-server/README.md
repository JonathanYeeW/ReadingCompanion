# Server Documentation

Below is the server documentation for development. I hope that one day this database is large enough for other developers to plug into and use for their websites. Go Reading!

## Users

### Template 
- Method Route:
- Inputs: 
- Outputs: 
- Method Description: 

## Books

### Term Bank:
- User Collection: The personal library of a user

### Get All Books
- Method Route: /books/
- Inputs: none
- Outputs: object { message : "Success", error: false, books: [Book Objects] }
- Method Description: Get's all the Book Objects in the database

### Get All Books For User By ID
- Method Route: /books/usercollection
- Inputs: { userid: String }
- Outputs: { message: "Success", error: false, books: [Book Objects] }
- Method Description: Taking the input of the userid, returns all the books in user's collection

### Get All Books By Title
- Method Route: /books/booktitle
- Inputs: { title: String }
- Outputs: { message: "Success", error: false, books: [Book Objects] }
- Method Description: Taking the input of a String (keyword), returns an array of books contain the string keyword 

### Get All Books By Author
- Method Route: /books/authorname
- Inputs: { name : String }
- Outputs: { message: "Success", error: false, books: [Book Objects] }
- Method Description: Taking the input of a String (keyword), returns an array of books whose author contains the string keyword

### Create Book
- Method Route: /books/create
- Inputs: { title: String, author: String, userid: String, isbn10: String, isbn13: String }
- Outputs: { message: "Success", error: false, newBook: Book Object }
- Method Description: Creates a new book object

### User Add Book To Collection
- Method Route: /books/add
- Inputs: { userid: String, id: String } // id is book._id
- Outputs: { message: "Success", error: false }
- Method Description: Adds the book object to user's collection

### User Remove Book From Collection
- Method Route: /books/remove
- Inputs: { userid: String, id: String } // id is book._id
- Outputs: { message: "Success", error: false }
- Method Description: 

### Delete All Books
- Method Route: /books/deleteAll
- Inputs: none
- Outputs: { message: "Success", error: false }
- Method Description: Deletes all Book Objects (used only for development purposes)

### Delete Book By Id
- Method Route: /books/delete
- Inputs: { bookid: String }
- Outputs: { message: "Success", error: false }
- Method Description: Deletes a single Book Object

### Get All Books That Are Not In Collection, Discover Books
- Method Route: /books/discover
- Inputs: { id: String } // id is user.id
- Outputs: { message: "Success", error: false, newBook: Book Object }
- Method Description: Queries the database for all books that are not in users collection and returns a single Book Object at random

### Get Total Book Object Count
- Method Route: /books/count
- Inputs: none
- Outputs: { message: "Success", error: false, count: Number }
- Method Description: Returns the total count of Book Objects

### Like Book
- Method Route: /books/like
- Inputs: { bookid: String, newLikes: Number }
- Outputs: { message: "Success", error: false }
- Method Description: Adds one to the total number of likes of a Book Object

### Template 
- Method Route:
- Inputs: 
- Outputs: 
- Method Description: 

## Reviews

### Template 
- Method Route:
- Inputs: 
- Outputs: 
- Method Description: 