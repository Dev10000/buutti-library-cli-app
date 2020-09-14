const fs = require('fs');


class Books {
	private bookDBfile = 'books.json';
	private library: Book[];

	constructor() {
		this.library = JSON.parse( fs.readFileSync(this.bookDBfile, 'utf8') );
	}

  add(book: Book) {
  	this.library.push(new Book());
  }

	function saveDB() {
		fs.writeFileSync(bookDBfile, JSON.stringify(books));
	}
	
	function getBookByISBN(isbn: string) {
		const book = books.find((book:any) => book.isbn === isbn);
		return book;
	}
	//console.log(getBookByISBN('9781449325862'));
	
	function getBook(author: string, title: string) {
		const book = books.find((book:any) => book.author === author && book.title === title);
		return book;
	}
	
}

interface Copy {
	id: string,
	status: 'borrowed' | 'in_library' | 'not_available',
	due: Date,
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
	private copies: Copy[];

	constructor(isbn: string, title: string) {
		this.isbn = name;
		this.title = title;
	}

	private printDate(dateString: string) {
		return new Date(dateString).toLocaleDateString();
	}

	private getAvailableCopies(copies: Copy[]): number {
		let available = 0;
		copies.forEach((copy:Copy) => {
			if (copy.status === 'in_library')
				++available;
		});
		return available;
	}

	public printBookDetails(book: Book) {
		const year = new Date(book.published).getFullYear();
		const titl = `${book.title} by ${book.author} (${year})`;
		const totalBooks = `Books in library: ${book.copies.length}`;
		const availableBooks = `Available for borrowing: ${this.getAvailableCopies(book.copies)}`;
		return `${titl}\n${totalBooks}\n${availableBooks}`;
	}
	
} // class Book
