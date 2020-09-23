
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


// TODO:
//returnBook() {}
changeName() {} // Method available in userController
removeAccount() {} // Method available in userController
logout() {
  this.loggedUser = null;
}

} // class LibraryUI


new LibraryUI();
