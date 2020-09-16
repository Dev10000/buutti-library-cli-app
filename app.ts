//const readline = require("readline-sync");
//import * as app1 from "./users/controllers/ui";
//new (require('./uitest'))();

const readline = require('readline-sync');

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
        case 'exit':
        case 'quit':
          console.log(`Come again soon!\n`);
          process.exit();
          break;
        case 'search':
          this.search();
					break;
			}

			if (this.logged === false) {
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
    console.log(`signup\tOpens a dialog for creating a new account.
login\tOpens a dialog for logging into an existing account.\n`);
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
    console.log(`Search for a book to borrow.`);
		const input: string = this.prompt();
		const found = books.findBooks(input);
		if (found.length === 0) console.log(`No books found. Try again, or press enter to quit dialog.`);
		else {
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
	}


	// TODO:
	signup() {}
  login() {}
	list() {}
	borrow() {}
	return() {}
	change_name() {}
	remove_account() {}
	logout() {}


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
} // class UI

const books = new (require('./books/bookController'))();
new LibraryUI();
