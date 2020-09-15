const fs = require('fs');

class Books {
	private bookDBfile = 'books.json';
	private books: Book[];

	constructor() {
		this.books = JSON.parse( fs.readFileSync(`${__dirname}/${this.bookDBfile}`, 'utf8') );
	}

	saveDB() {
		fs.writeFileSync(this.bookDBfile, JSON.stringify(this.books));
	}

  add(book: Book) {
		this.books.push(new Book(book));
		this.saveDB();
  }

	getBookByISBN(isbn: string): Book {
		const book = this.books.find((book:any) => book.isbn === isbn);
		return book;
	}
	//console.log(getBookByISBN('9781449325862'));

	getBook(author: string, title: string): Book {
		const book = this.books.find((book:any) => book.author === author && book.title === title);
		return book;
	}

	printBorrowedBooks(borrower_id: number) {
		let borrowed = `Books you've borrowed:\n`;
		this.books.forEach((book: Book)=> {
			book.copies.forEach((copy: Copy) => {
				if (parseInt(copy.borrower_id) === borrower_id) {
					const due_date = new Date(copy.due_date).toLocaleDateString();
					borrowed += `\n${book.getTitleAuthorYear()}\nDue ${due_date}`;
				}
			});
		});
	}

	// returns books searched by its title or author name
	findBook(searchString: string): Book[] {
		const result = this.books.filter((book: Book)=> {
			const haystack = book.title + book.author;
			const idx = haystack.search(searchString);
			if (idx !== -1) return true; // match found, push book to found results
		});
		return result;
	}

	// returns true if success, false if failure
	borrowBook(book: Book, borrower_id: number): Boolean {
		const availableCopy: Copy = book.copies.find((copy: Copy) => copy.status === 'in_library');
		if (availableCopy === undefined) return false; // no books are available
		else {
			availableCopy.borrower_id = borrower_id.toString();
			availableCopy.status = 'borrowed';
			const date = new Date();
			date.setDate(date.getDate() + 28); // four weeks from now :D
			availableCopy.due_date = date;
			// TODO: add to user's books
		}
		return true;
	}

	// returns true if success, false if failure
	returnBook(book: Book, borrower_id: number): Boolean {
		const borrowedCopy: Copy = book.copies.find((copy: Copy) => copy.status === 'borrowed' && parseInt(copy.borrower_id) === borrower_id);
		if (borrowedCopy === undefined) return false; // the book is not currently borrowed by the borrower
		else {
			borrowedCopy.borrower_id = null;
			borrowedCopy.status = 'in_library';
			borrowedCopy.due_date = null;
			// TODO: remove from user's books and add to user's history
		}
		return true;
	}
} // class Books


interface Copy {
	id: string,
	status: 'borrowed' | 'in_library' | 'not_available',
	due_date: Date,
	borrower_id: string,
}


class Book {
	private isbn: string;
	private title: string;
	private subtitle: string;
	private author: string;
	private published: Date;
	private publisher: string;
	private pages: number;
	private description: string;
	private website: URL;
	public copies: Copy[];

	constructor(book: Book) {
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
		this.copies.forEach((copy:Copy) => {
			if (copy.status === 'in_library')
				++available;
		});
		return available;
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
