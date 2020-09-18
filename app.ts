// use first npm install to install the required modules after cloning
// start the app with npx ts-node -- app.ts

//const readline = require("readline-sync");
//import * as app1 from "./users/controllers/ui";
//new (require('./uitest'))();

const readline = require('readline-sync');

const user = require('./users/controllers/userController');
const books = new (require('./books/bookController'))();

class LibraryUI {
	private logged = false;
	private current_user = 1234;
 
  constructor() {
    this.greet();
    this.getInput();
	}
	
	// question prompt, returns string
	prompt(): string {
		const input: string = readline.question('> ');
		return input.trim().toLowerCase();
	}

	// main UI loop
  getInput() {
    while (true) {
      const input: string = this.prompt();
      switch (input) {
        case 'help':
          this.help();
          break;
        case 'search':
          this.search();
					break;
        case 'exit':
        case 'quit':
          console.log(`Come again soon!\n`);
					return; // process.exit()
			}

			if (this.logged === false) { // logged out
				switch (input) {
					case 'signup':
						this.signup();
						break;
					case 'login':
						this.login();
						break;
				}

			} else { // logged in
				switch (input) {
					case 'list':
						this.list();
						break;
					case 'borrow':
						this.borrow();
						break;
					case 'return':
						this.return();
						break;
					case 'change_name':
						this.change_name();
						break;
					case 'remove_account':
						this.remove_account();
						break;
					case 'logout':
						this.logout();
						break;
				}
			}
		}
  } // getInput()


  greet() {
    console.clear();
    console.log(`Welcome to Green library!\nGet the list of available commands by typing 'help'.\n`);
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

  help() {
    console.clear();
    this.helpEverywhere();
    if (this.logged === false) this.helpLoggedOut();
    else this.helpLoggedIn();
  }

	
  search() {
		let found;
		console.log(`\nSearch for a book to borrow.`);

		while (true) {
			const input: string = readline.question('search> ').trim();
			if (input === '') return; // quit search dialog
			found = books.findBooks(input);
			if (found.length === 0) console.log(`No books found. Try again, or press enter to quit dialog.`);
			else break;
		}

		console.log(books.listBooks(found));
		if (this.logged === true) {
			console.log(`Choose result by typing its number.`);
			const input: string = this.prompt();
			const selectedBook = found[parseInt(input)-1];
			if (selectedBook !== undefined) {
				console.log(`Borrow ${selectedBook.getTitleAuthorYear()}? (y/n)`);
				const input: string = this.prompt();
				if (input.trim().toLowerCase() === 'y') {
					if (books.borrowBook(selectedBook, this.current_user) === true) console.log('Borrowed!');
					else console.error('Error! Not borrowed.');
				}
			}
		}
	}


	signup() {
		const newUser = new user();
		console.log('\nCreating a new user account.');

		while(true) { // check the given name correctness
			console.log('Insert your name.');
			try {
				newUser.setFullName = readline.question('> ');
				break; // exit the while loop and continue the signup
			} catch(error) { console.log(error.message) }
		}

		while (true) { // get the entered passwords to match
			while (true) { // check the given password correctness
				console.log('Insert new password.');
				try {
					newUser.setPassword = readline.question('> ', { hideEchoBack: true } ); // The typed text on screen is hidden by `*`
					break;
				} catch(error) { console.log(error.message) }
			}

			console.log('Re-enter your password to ensure it matches the one given above.');
			const verifyPass = readline.question('> ', { hideEchoBack: true } );
			if (newUser.getPassword !== verifyPass) {
				console.log('Passwords do not match.');
				if (readline.keyInYN('Try again?')) continue;
				else return; // exit signup function
			}
			else break;
		}

		newUser.createUser(); // save to file
		console.log(`Passwords match.\nYour account is now created.\nYour account id is ${newUser.getId}.\nStore your account ID in a safe place, preferably in a password manager.\nUse the command 'login' to log in to your account.\n`);
	}

	// TODO:
  login() {
		this.logged = true;
	}
	list() {}
	borrow() {}
	return() {}
	change_name() {}
	remove_account() {}
	logout() {
		this.logged = false;
	}


  askLogin () {
    console.log(`If you've registered, please login with your id:`);
    const input: string = this.prompt();
    if(input == '0000') {
      console.log(`Welcome, your id: ${input} is valid`)
    } else {
      console.log('Your id is invalid, please try agin')
    }
    return input
  }
} // class LibraryUI


new LibraryUI();
