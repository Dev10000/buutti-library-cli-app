// Main app of the library project

// Instructions:
// git clone url
// cd repo
// npm install
// npx ts-node -- app.ts

import readline from 'readline-sync';

const User = require('./users/userController');
const books = new (require('./books/bookController'))();

class LibraryUI {
	private libraryName = 'Green e-library';
	private loggedUser: any = null; // null when no credentials given (logged out Guest-mode)


	// shows the library greeting and starts the main UI input loop
	constructor() {
    this.greet();
    this.getInput();
	}


	// first message
	greet() {
    console.clear();
    console.log(`Welcome to Green e-library!\nGet the list of available commands by typing 'help' or 'login' if you're a member.\n`);
  }


	// main UI loop: listens for commands with possible arguments
	getInput() {
    while (true) {
			const loggedName = (this.loggedUser === null) ? 'Guest' : this.loggedUser.name;
			const inputArray: string[] = readline.question(`${loggedName}> `).toLowerCase().split(/\s+/); // or readline.promptCL()
			const cmd = inputArray.shift(); // remove first array item as a command word
			const arg: string = inputArray.join(''); // rest of array items as an argument string
      switch (cmd) {
        case 'help':
          this.help();
          break;
        case 'search':
          this.search(arg);
					break;
        case 'exit':
        case 'quit':
          //console.log(`Thank you for using ${this.libraryName}.\nCome again soon!\n`);
					//return; // process.exit()
					this.quit();
			}

			if (this.loggedUser === null) { // accept logged out commands
				switch (cmd) {
					case 'signup':
						this.signup();
						break;
					case 'login':
						this.login(arg);
						break;
				}

			} else { // accept logged in commands
				switch (cmd) {
					case 'list':
						this.listBorrowed();
						break;
					case 'borrow':
						this.borrowBook();
						break;
					case 'return':
						this.returnBook();
						break;
					case 'change_name':
						this.changeName();
						break;
					case 'remove_account':
						this.removeAccount();
						break;
					case 'logout':
						this.logout();
						break;
				}
			}
		} // while
  } // getInput()


	// help dialog
	help() {
    this.helpEverywhere();
    if (this.loggedUser === null) this.helpLoggedOut();
    else this.helpLoggedIn();
  }

  helpEverywhere() {
    console.log(`Here's a list of commands you can use:\n
help\t\tPrints this listing.
quit\t\tQuits the program.
search\t\tOpens a dialog for searching for a book in the library system.\n`);    
  }

  helpLoggedOut() {
    console.log(`signup\t\tOpens a dialog for creating a new account.
login\t\tOpens a dialog for logging into an existing account.\n`);
  }

  helpLoggedIn() {
    console.log(`list\t\tLists the books you are currently borrowing.
borrow\t\tOpens a dialog for borrowing a book.
return\t\tOpens a dialog for returning a book.
change_name\tOpens a dialog for changing the name associated with the account.
remove_account\tOpens a dialog for removing the currently logged in account from the library system.
logout\t\tLogs out the currently logged in user.\n`);
  }


	// search and borrow a book by arg or with dialog
  search(arg: string) {
		let found;

		if (arg.length > 0) { // find directly by argument, skipping dialog
			found = books.findBooks(arg);
			if (found.length === 0) console.log(`No books found with search term '${arg}'.`);
		}
		else { // find with dialog
			console.log(`\nSearch for a book to borrow.`);
			while (true) {
				const input: string = readline.question('search> ').trim();
				if (input === '') return; // quit search dialog
				found = books.findBooks(input);
				if (found.length === 0) console.log('No books found. Try again, or press enter to quit dialog.');
				else break;
			}
		}

		console.log(books.listBooks(found));
		if (this.loggedUser !== null) {
			console.log(`Choose result by typing its number.`);
			const input: number = readline.questionInt('borrow> '); // or readline.keyInSelect()
			const selectedBook = found[input-1];
			if (selectedBook !== undefined) {
				if (readline.keyInYN(`Borrow ${selectedBook.getTitleAuthorYear()}?`)) {
					if (books.borrowBook(selectedBook, this.loggedUser.id) === true) console.log('Borrowed!');
					else console.error('Error! Book is not available.');
				}
				else return; // exit signup function if 'n' is pressed
			}
		}
	} // search()


	// borrow a book by ISBN
	borrowBook() {
		console.log('Give ISBN of the book to borrow.');
		while (true) {
			const input: string = readline.question('borrow> ');
			if (input === '') return; // enter quits the dialog
			const book = books.getBookByISBN(input);
			if (book === undefined) console.log('No books found for that ISBN! Try again, or press enter to quit dialog.');
			else {
				console.log(`\nFound book:\n${ book.printDetails() }\n`);
				if (book.getAvailableCopies() > 0) {
					if (readline.keyInYN(`Borrow ${ book.getTitleAuthorYear() }?`)) {
						if (books.borrowBook(book, this.loggedUser.id) === true) {
							console.log('Borrowed!');
							break; // exit current dialog
						}
						else console.error('Error! Book is not available.');
					}
					else return; // exit isbn dialog if 'n' is pressed
				}
				else console.log('That book is not available! Try again, or press enter to quit dialog.');
			}
		}
	}


	// signup dialog
	signup() {
		const newUser = new User();
		console.log('\nCreating a new user account.');

		while (true) {
			console.log('Insert your name, or press enter to quit dialog.');
			const input = readline.question('signup> ');
			if (input === '') return; // enter quits the dialog
			try {
				newUser.setFullName = input; // throws Error if the given name is not good
				break; // exit the while loop and continue the signup
			} catch(error) { console.log(error.message) }
		}

		while (true) { // get the entered passwords to match
			while (true) { // check the given password correctness
				console.log('Insert new password, or press enter to quit dialog.'); // TODO: or press enter to quit dialog
				const input = readline.question('pass> ', { hideEchoBack: true } ); // The typed text on screen is hidden by '*'
				if (input === '') return; // enter quits the dialog
				try { // or with readline.questionNewPassword();
					newUser.setPassword = input;
					break;
				} catch(error) { console.log(error.message) }
			}

			console.log('Re-enter your password to ensure it matches the one given above, or press enter to quit dialog.');
			const input = readline.question('pass> ', { hideEchoBack: true } );
			if (input === '') return; // enter quits the dialog
			if (newUser.getPassword !== input) {
				console.log('Passwords do not match.');
			}
			else break; // continue to createUser
		}

		newUser.createUser(); // save new user to file
		console.log(`Passwords match.\nYour account is now created.\nYour account id is ${newUser.getId}.\nStore your account ID in a safe place, preferably in a password manager.\nUse the command 'login' to log in to your account.\n`);
	} // signup()


	// login dialog
  login(arg: string) {
		let user; // user object
		console.log('Type your account ID to log in, or press enter to quit dialog.');
		while (true) {
			const input: number = readline.questionInt('login> ');
			if (input === null) return; // quit dialog
			try {
				this.loggedUser = User.getUser(input); // This return a user object
				break; // continue to password
			} catch(error) {
				console.log('An account with that ID does not exist. Try again, or press enter to quit dialog.');
			}
		}

		console.log('Account found! Insert your password, or press enter to quit dialog.');
		while (true) {
			const input: string = readline.question('pass> ', { hideEchoBack: true });
			if (input === '') return; // quit dialog
			if (input === this.loggedUser.password) { 
				console.log(`Welcome, ${this.loggedUser.name}!`); 
				this.helpLoggedIn();
				break;
			}
			else console.log('Wrong password. Try again, or press enter to quit dialog.');
		}

	} // login()


	// shows the list of books borrowed by the currently logged in user
	listBorrowed() {
		console.log( books.printBorrowedBooks(this.loggedUser.id) );
	}


	// TODO:
	//returnBook() {}

	changeName() {
		// The changeName method provided by the userController accepts 2 args - userId and the new name respectively
		console.log('Please type your account ID again to change your name.');
		while (true) {
			const id: number = readline.questionInt('Id> ');
			if (id === null) return; // quit dialog
			try {
				if(this.loggedUser = User.getUser(+id)) {
					console.log(this.loggedUser.name + ' ' + this.loggedUser.id);
					const user = new User();
					const newName = readline.question('Please type a new name> ');
					user.changeName(this.loggedUser.id, newName);
					console.log(`Your new name is ${newName}`);
					return;
				}
			} catch(error) {
				console.log('An account with that ID does not exist. Try again, or press enter to quit dialog.');
			}
		}
		

	} // Method available in userController



	removeAccount() {
		// The changeName method provided by the userController accepts 2 args - userId and the new name respectively
		console.log('Please type your account ID again to remove your account.');
		while (true) {
			const id: number = readline.questionInt('Id> ');
			if (id === null) return; // quit dialog
			try {
				if(this.loggedUser = User.getUser(+id)) {
					User.deleteUser(this.loggedUser.id)
					console.log(`User with id: ${this.loggedUser.id} has been removed`);
					this.loggedUser = null;
					return this.greet();
				
				}
			} catch(error) {
				console.log('An account with that ID does not exist. Try again, or press enter to quit dialog.');
			}
		}
		
	} // Method available in userController

	// Return book Function
	returnBook() {
    
		while (true) {
				console.clear()
				console.log("YOU ARE IN RETURN BOOK DIALOGUE");
				console.log("\nHere’s a list of commands you can use!\n\n" +
								"help\t\tPrints this listing.\n" +
								"quit\t\tQuits the program.\n" +
								"search\t\tOpens a dialog for searching for a book in the library system.\n\n" +
								"list\t\tLists the books you are currently borrowing.\n" +
								"borrow\t\tOpens a dialog for borrowing a book.\n" +
								"return\t\tOpens a dialog for returning a book.\n" +
								"change_name\tOpens a dialog for changing the name associated with the account.\n" +
								"remove_account\tOpens a dialog for removing the currently logged in account from the library system.\n" +
								"logout\t\tLogs out the currently logged in user\n");

				console.log("\n\nPlease find below books you've borrowed and choose book to be returned: ");
				console.log("\n ");
				this.listBorrowed();
	
				let logged_in: any = readline.question(`\nPlease type a command: `)
	
				try {
						// Make sure correct command is typed
						if (!(logged_in === "help" || logged_in === "quit" || logged_in === "search" || logged_in === "list" || Number.isInteger(parseInt(logged_in))
						|| logged_in === "borrow"|| logged_in === "return" || logged_in === "change_name" || logged_in === "remove_account" || logged_in === "logout")) {
								console.clear();
								throw "\nCommand not found!";
						}
						if (logged_in === "help") {
								console.clear();
								console.log("You are already in help menu");
								this.wait(2000);
						}
						if (logged_in === "quit") {
								console.clear();
								this.quit();
						}
						if (logged_in === "search") {
								console.clear();
								// console.log("GO TO SEARCH FUNCTION");
								let arg: string = ""
								this.search(arg);
						}
						if (logged_in === "list") {
								console.clear();
								// console.log("GO TO LIST FUNCTION");
								this.listBorrowed();
						} 
						if (logged_in === "borrow") {
								console.clear();
								// console.log("GO TO BORROW FUNCTION");
								this.borrowBook();
						}
						if (logged_in === "return") {
								console.clear();
								console.log("You are already in return menu");
								// this.returnBook();
								this.wait(2000);
						}
						if (logged_in === "change_name") {
								console.clear();
								console.log("GO TO CHANGE NAME FUNCTION");
								this.changeName();
								this.wait(2000);
						}
						if (logged_in === "remove_account") {
								console.clear();
								console.log("GO TO REMOVE_ACCOUNT FUNCTION");
								this.wait(2000);
								this.removeAccount();								
						}
						if (logged_in === "logout") {
								console.clear();
								// console.log("GO TO LOGOUT FUNCTION");
								this.logout();
								this.getInput();
						}
						if (Number.isInteger(parseInt(logged_in))) {
								console.clear();
								console.log("GO TO RETURN BOOK FUNCTION");
								this.wait(2000);
								books.returnBook(this.loggedUser.id);	
						}
				}
				catch(err) {
						console.clear();
						console.log(err);
						this.wait(2000);            
				}
		}
	} 
		
	// Wait Function
	wait(ms: number){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
			end = new Date().getTime();
		}
	}

	// Quit Function
	quit() {
    while (true) {
        console.clear();
        let quit: string = readline.question(`Are you sure you want to quit y/n: `)
        try {
            // Make sure correct command is typed
            if (!(quit === "y" || quit === "n" )) {
                console.clear();
                throw "Command not found. Please type either y or n: ";
            }
            
            if (quit === "y") {
                console.clear();
                console.log("Good Bye!");
                return process.exit();
                
            }
            if (quit === "n") {
                console.clear();
                console.log("Good Choice!");
                this.wait(2000);
								this.getInput(); 
            }   
        }
        catch(err) {
            console.clear();
            console.log(err);
            this.wait(2000);    
        }
    }
}
	
	
	logout() {
		this.loggedUser = null;
	}

} // class LibraryUI


new LibraryUI();
