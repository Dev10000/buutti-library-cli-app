{
	const fs = require('fs');
	
	class Books {
		private bookDBfile = 'books.json';
		private books: Book[];
	
		constructor() {
			this.books = [];
			const bookDB = JSON.parse( fs.readFileSync(`${__dirname}/${this.bookDBfile}`, 'utf8') );
			bookDB.forEach((book: Book) => {
				this.books.push(new Book(book));
			});
		}
		
		add(book: Book) {
			this.books.push(new Book(book));
			this.saveDB();
		}
	
		saveDB() {
			fs.writeFileSync(this.bookDBfile, JSON.stringify(this.books, null, 2)); // pretty print JSON
		}

		getBookByISBN(isbn: string): Book|undefined {
			const book = this.books.find((book:any) => book.isbn === isbn);
			return book;
		}
	
		getBook(author: string, title: string): Book|undefined {
			const book = this.books.find((book:any) => book.author === author && book.title === title);
			return book;
		}
	
		printBorrowedBooks(borrower_id: number): string {
			let borrowed = `Books you've borrowed:\n`;
			this.books.forEach((book: Book)=> {
				book.copies.forEach((copy: ICopy) => {
					if (parseInt(copy.borrower_id) === borrower_id) {
						const due_date = new Date(copy.due_date).toLocaleDateString();
						borrowed += `\n${book.getTitleAuthorYear()}\nDue ${due_date}`;
					}
				});
			});
			return borrowed;
		}
	
		// returns books searched by its title or author name
		findBooks(searchString: string): Book[] {
			const result = this.books.filter((book: Book)=> {
				const haystack = book.title + book.author;
				const re = new RegExp(searchString, 'i');
				const idx = haystack.search(re);
				if (idx !== -1) return true; // match found, push book to found results
			});
			return result;
		}
	
		// returns true if success, false if failure
		borrowBook(book: Book, borrower_id: number): Boolean {
			const availableCopy = book.copies.find((copy: ICopy) => copy.status === 'in_library');
			if (availableCopy === undefined) return false; // no books are available
			else {
				availableCopy.borrower_id = borrower_id.toString();
				availableCopy.status = 'borrowed';
				const date = new Date();
				date.setDate(date.getDate() + 28); // four weeks from now :D
				availableCopy.due_date = date;
				// TODO: add to user's books
			}
			this.saveDB();
			return true;
		}
	
		// returns true if success, false if failure
		returnBook(book: Book, borrower_id: number): Boolean {
			const borrowedCopy = book.copies.find((copy: ICopy) => copy.status === 'borrowed' && parseInt(copy.borrower_id) === borrower_id);
			if (borrowedCopy === undefined) return false; // the book is not currently borrowed by the borrower
			else {
				borrowedCopy.borrower_id = null;
				borrowedCopy.status = 'in_library';
				borrowedCopy.due_date = null;
				// TODO: remove from user's books and add to user's history
			}
			this.saveDB();
			return true;
		}
	} // class Books
	
	
	interface ICopy {
		id: string,
		status: 'borrowed' | 'in_library' | 'not_available',
		due_date: any,
		borrower_id: any,
	}
	
	
	class Book {
		private isbn: string;
		public title: string;
		private subtitle: string;
		public author: string;
		private published: Date;
		private publisher: string;
		private pages: number;
		private description: string;
		private website: URL;
		public copies: ICopy[];
	
		constructor(book: any) {
			this.isbn = book.isbn;
			this.title = book.title;
			this.subtitle = book.subtitle;
			this.author = book.author;
			this.published = book.published;
			this.publisher = book.publisher;
			this.pages = book.pages;
			this.description = book.description;
			this.website = book.website;
			this.copies = book.copies;
		}

		private printDate(dateString: string): string {
			return new Date(dateString).toLocaleDateString();
		}
	
		private getAvailableCopies(): number {
			let available = 0;
			this.copies.forEach((copy:ICopy) => {
				if (copy.status === 'in_library')
					++available;
			});
			return available;
		}

		// add a new copy of the book to the library
		addCopy() {
			const copy: ICopy = {
				id: (this.copies.length + 1).toString(),
				status: 'in_library',
				due_date: null,
				borrower_id: null,
			};
			this.copies.push(copy);
		}

		getTitleAuthorYear(): string {
			const year = new Date(this.published).getFullYear();
			return `${this.title} by ${this.author} (${year})`;
		}

		printDetails(): string {
			const title = this.getTitleAuthorYear();
			const totalBooks = `Books in library: ${this.copies.length}`;
			const availableBooks = `Available for borrowing: ${this.getAvailableCopies()}`;
			return `${title}\n${totalBooks}\n${availableBooks}`;
		}
	} // class Book


// tests
const books = new Books();

const newBook = new Book({
	isbn: '4358934985',
	title: 'New book',
	subtitle: 'Good stuff',
	author: 'Writer Goodman',
	published: new Date(10000000),
	publisher: 'Virtual publishing',
	pages: 666,
	description: 'Everyone should read this book.',
	website: new URL('hxxp://non.existent/'),
	copies: [],
});
//newBook.addCopy();

//books.add(newBook);
//books.saveDB();

//console.log(books.getBookByISBN('9781449325862'));
const foundBook = books.findBooks('java')[1];
//console.log(books.borrowBook(foundBook, 1234));
//console.log(books.printBorrowedBooks(1234));
//console.log(books.returnBook(foundBook, 1234));
//console.log(books.printBorrowedBooks(1234));

} // books.ts
	