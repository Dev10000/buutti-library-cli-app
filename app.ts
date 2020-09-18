// use first npm install to install the required modules after cloning
// start the app with npx ts-node -- app.ts

//const readline = require("readline-sync");
//import * as app1 from "./users/controllers/ui";
//new (require('./uitest'))();

import readline from 'readline-sync';

const User = require('./users/controllers/userController');
const books = new (require('./books/bookController'))();

class LibraryUI {
	private loggedUser: any = null; // null when no credentials given, use Guest-mode

	constructor() {
    this.greet();
    this.getInput();
	}


	// first message
	greet() {
    console.clear();
    console.log(`Welcome to Green e-library!\nGet the list of available commands by typing 'help'.\n`);
  }


	// main UI loop
	getInput() {
    while (true) {
			const loggedName = (this.loggedUser === null) ? 'Guest' : this.loggedUser.name; // should be: this.loggedUser.getFullName?
			const inputArray: string[] = readline.question(`${loggedName}> `).toLowerCase().split(' '); // or readline.promptCL()
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
          console.log(`Thank you for using Green e-library.\nCome again soon!\n`);
					return; // process.exit()
			}

			if (this.loggedUser === null) { // logged out
				switch (cmd) {
					case 'signup':
						this.signup();
						break;
					case 'login':
						this.login(arg);
						break;
				}

			} else { // logged in
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
    console.clear();
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


	// search book by arg or with dialog
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
					if (books.borrowBook(selectedBook, this.loggedUser.id) === true) console.log('Borrowed!'); // should be: this.loggedUser.getId
					else console.error('Error! Not borrowed.');
				}
				else return; // exit signup function if 'n' is pressed
			}
		}
	} // search()


	// signup dialog
	signup() {
		const newUser = new User();
		console.log('\nCreating a new user account.');

		while(true) { // check the given name correctness
			console.log('Insert your name.');
			try {
				newUser.setFullName = readline.question('signup> ');
				break; // exit the while loop and continue the signup
			} catch(error) { console.log(error.message) }
		}

		while (true) { // get the entered passwords to match
			while (true) { // check the given password correctness
				console.log('Insert new password.'); // TODO: or press enter to quit dialog
				try { // or with readline.questionNewPassword();
					newUser.setPassword = readline.question('pass> ', { hideEchoBack: true } ); // The typed text on screen is hidden by `*`
					break;
				} catch(error) { console.log(error.message) }
			}

			console.log('Re-enter your password to ensure it matches the one given above.');
			const verifyPass = readline.question('pass> ', { hideEchoBack: true } );
			if (newUser.getPassword !== verifyPass) {
				console.log('Passwords do not match.');
				if (readline.keyInYN('Try again?')) continue; // this is required to exit the loop on macOS, as CTRL-C does not work on password prompt (hideEchoBack)
				else return; // exit signup function
			}
			else break;
		}

		newUser.createUser(); // save to file
		console.log(`Passwords match.\nYour account is now created.\nYour account id is ${newUser.getId}.\nStore your account ID in a safe place, preferably in a password manager.\nUse the command 'login' to log in to your account.\n`);
	} // signup()


	// login dialog
  login(arg: string) {
		console.log('Type your account ID to log in.');
		while (true) {
			const input: string = readline.question('login> ');
			if (input === '') return; // quit dialog
			try {
				this.loggedUser = User.getUser(parseInt(input)); // I thought this would return an User object, but it just returns the parsed JSON data in an array, so the getters/setters do not work here?!
				this.loggedUser = this.loggedUser[0]; // workaround to directly access the user data without index, but the getters/setters should work with this
				//console.log(this.loggedUser.getFullName, this.loggedUser.name); // undefined, name
				break; // continue to password
			} catch(error) {
				console.log('An account with that ID does not exist. Try again, or press enter to quit dialog.');
			}
		}

		console.log('Account found! Insert your password.');
		while (true) {
			const input: string = readline.question('pass> ', { hideEchoBack: true });
			if (input === '') return; // quit dialog
			if (input === this.loggedUser.password) { // should be: this.loggedUser.getPassword?
				console.log(`Welcome, ${this.loggedUser.name}!`); // should be: this.loggedUser.getFullName?  AND why the username is always saved in upper case?!
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
	borrowBook() {}
	returnBook() {}
	changeName() {}
	removeAccount() {}
	logout() {
		this.loggedUser = null;
	}

} // class LibraryUI


new LibraryUI();
