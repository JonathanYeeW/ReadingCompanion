# ReadingCompanion

### Books

Term Bank:
User Collection:

Method Name: Get All Books
Method Route: /books/
Inputs: none
Outputs: object { message : "Success", error: false, books: [Book Objects] }
Method Description: Get's all the Book Objects in the database

Method Name: Get All Books For User By ID
Method Route: /books/usercollection
Inputs: { userid: String }
Outputs: { message: "Success", error: false, books: [Book Objects] }
Method Description: Taking the input of the userid, returns all the books in user's collection

Method Name: Get All Books By Title
Method Route: /books/booktitle
Inputs: { title: String }
Outputs: { message: "Success", error: false, books: [Book Objects] }
Method Description: Taking the input of a String (keyword), returns an array of books contain the string keyword 

Method Name: Get All Books By Author
Method Route: /books/authorname
Inputs: { name : String }
Outputs: { message: "Success", error: false, books: [Book Objects] }
Method Description: Taking the input of a String (keyword), returns an array of books whose author contains the string keyword

Method Name: Create Book
Method Route: /books/create
Inputs: { title: String, author: String, userid: String, isbn10: String, isbn13: String }
Outputs: { message: "Success", error: false, newBook: Book Object }
Method Description: Creates a new book object

Method Name: User Add Book To Collection
Method Route: /books/add
Inputs: { userid: String, id: String } // id is book._id
Outputs: { message: "Success", error: false }
Method Description: Adds the book object to user's collection

Method Name: User Remove Book From Collection
Method Route: /books/remove
Inputs: { userid: String, id: String } // id is book._id
Outputs: { message: "Success", error: false }
Method Description: 

Method Name: Delete All Books
Method Route: /books/deleteAll
Inputs: none
Outputs: { message: "Success", error: false }
Method Description: Deletes all Book Objects (used only for development purposes)

Method Name: Delete Book By Id
Method Route: /books/delete
Inputs: { bookid: String }
Outputs: { message: "Success", error: false }
Method Description: Deletes a single Book Object

Method Name: Get All Books That Are Not In Collection, Discover Books
Method Route: /books/discover
Inputs: { id: String } // id is user.id
Outputs: { message: "Success", error: false, newBook: Book Object }
Method Description: Queries the database for all books that are not in users collection and returns a single Book Object at random

Method Name: Get Total Book Object Count
Method Route: /books/count
Inputs: none
Outputs: { message: "Success", error: false, count: Number }
Method Description: Returns the total count of Book Objects

Method Name: Like Book
Method Route: /books/like
Inputs: { bookid: String, newLikes: Number }
Outputs: { message: "Success", error: false }
Method Description: Adds one to the total number of likes of a Book Object

Method Name: 
Method Route:
Inputs: 
Outputs: 
Method Description: 