import readline from "readline-sync"

// npm init -y
// tsc --init
// npm install --save-dev @types/node 
// npm install readline-sync
// npm install --save-dev @types/readline-sync
// npm i @types/node  process.exit

// npm i yargs
// npm i @types/yargs --save-dev
/* "-- save" As of npm 5.0.0, installed modules are added as a dependency by default, so the --save option is no longer needed. 
The other save options still exist and are listed in the documentation for npm install. */
// npm i enquirer
// npm i chalk
// npm i figlet
// npm i clear


// 1. git init - to make a new repository

// 2. git add .

// 3. git commit -m "Init commit"



// Use git config --global user.name “my_user”
// and git config --global user.email “my.email@domain.com”
// to configure your git

// To actually make changes to the remote repository, you need to use git push






// if(welcome === 'help') {
//   console.log(`$ help => Prints this listing.\n$ quit => Quits the program.\n$ search => Opens a dialog for searching for a book in the library system.`)
// } 












function greet() {
    console.clear();
    console.log("Welcome to Varpaisjärvi library!");
    wait(3000);
    while (true) {
        console.clear();
        let welcome: string = readline.question(`Get the list of available commands by typing 'help': `)
        try {
            // Make sure correct command is typed
            if (!(welcome === "help" || welcome === "quit" || welcome === "search")) {
                console.clear();
                throw "Command not found. Please type 'help' to get available commands ";
            }
            if (welcome === "help") {
                console.clear();
                loggedOut();
            }
            if (welcome === "quit") {
                console.clear();
                quit();
            }
            if (welcome === "search") {
                console.clear();
                console.log("GO TO SEARCH FUNCTION");
            }    
        }
        catch(err) {
            console.clear();
            console.log(err);
            wait(2000);
        }
    }
}

greet();










function loggedOut() {
    
    while (true) {
        console.clear()
        console.log("YOU ARE LOGGED OUT");
        console.log("\nHere’s a list of commands you can use!\n\n" +
                "help                Prints this listing.\n" +
                "quit                Quits the program.\n" +
                "search              Opens a dialog for searching for a book in the library system.\n\n" +
                "signup              Opens a dialog for creating a new account.\n" +
                "login               Opens a dialog for logging into an existing account.");

        let logged_out: string = readline.question(`\nPlease type a command: `)

        try {
            // Make sure correct command is typed
            if (!(logged_out === "help" || logged_out === "quit" || logged_out === "search" || logged_out === "signup" || logged_out === "login")) {
                console.clear();
                throw "\nCommand not found!";
            }
            if (logged_out === "help") {
                console.clear();
                console.log("You are already in help menu");
                wait(2000);
            }
            if (logged_out === "quit") {
                console.clear();
                quit();
            }
            if (logged_out === "search") {
                console.clear();
                console.log("GO TO SEARCH FUNCTION");
                wait(2000);
            }
            if (logged_out === "signup") {
                console.clear();
                console.log("GO TO SIGNUP FUNCTION");
                wait(2000);
                loggedIn();
            }
            if (logged_out === "login") {
                console.clear();
                console.log("GO TO LOGIN FUNCTION");
                wait(2000);
                loggedIn();
            }
        }
        catch(err) {
            console.clear();
            console.log(err);
            wait(2000);            
        }
    } 
    
}










function loggedIn() {
    
    while (true) {
        console.clear()
        console.log("YOU ARE LOGGED IN");
        console.log("\nHere’s a list of commands you can use!\n\n" +
                "help                Prints this listing.\n" +
                "quit                Quits the program.\n" +
                "search              Opens a dialog for searching for a book in the library system.\n\n" +
                "LOGGED IN COMMANDS\n" +
                "list                Lists the books you are currently borrowing.\n" +
                "borrow              Opens a dialog for borrowing a book.\n" +
                "return              Opens a dialog for returning a book.\n" +
                "change_name         Opens a dialog for changing the name associated with the account.\n" +
                "remove_account      Opens a dialog for removing the currently logged in account from the library system.\n" +
                "logout              Logs out the currently logged in user.\n");

        let logged_in: string = readline.question(`\nPlease type a command: `)

        try {
            // Make sure correct command is typed
            if (!(logged_in === "help" || logged_in === "quit" || logged_in === "search" || logged_in === "list"
            || logged_in === "borrow"|| logged_in === "return" || logged_in === "change_name" || logged_in === "remove_account" || logged_in === "logout")) {
                console.clear();
                throw "\nCommand not found!";
            }
            if (logged_in === "help") {
                console.clear();
                console.log("You are already in help menu");
                wait(2000);
            }
            if (logged_in === "quit") {
                console.clear();
                quit();
            }
            if (logged_in === "search") {
                console.clear();
                console.log("GO TO SEARCH FUNCTION");
                wait(2000);
            }
            if (logged_in === "list") {
                console.clear();
                console.log("GO TO LIST FUNCTION");
                wait(2000);
            }
            if (logged_in === "borrow") {
                console.clear();
                console.log("GO TO BORROW FUNCTION");
                wait(2000);
            }
            if (logged_in === "return") {
                console.clear();
                console.log("GO TO RETURN FUNCTION");
                wait(2000);
            }
            if (logged_in === "change_name") {
                console.clear();
                console.log("GO TO CHANGE NAME FUNCTION");
                wait(2000);
            }
            if (logged_in === "remove_account") {
                console.clear();
                console.log("GO TO REMOVE_ACCOUNT FUNCTION");
                wait(2000);
            }
            if (logged_in === "logout") {
                console.clear();
                console.log("GO TO LOGOUT FUNCTION");
                wait(2000);
                logout();
            }
        }
        catch(err) {
            console.clear();
            console.log(err);
            wait(2000);            
        }
    }    
}










function quit() {
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
                wait(2000);
                //setTimeout(() => {  greet(); }, 20000);
                greet();
            }   
        }
        catch(err) {
            console.clear();
            console.log(err);
            wait(2000);    
        }
    }
}










function logout() {
    while (true) {
        console.clear();
        let quit: string = readline.question(`Are you sure you want to logout y/n: `)
        try {
            // Make sure correct command is typed
            if (!(quit === "y" || quit === "n" )) {
                console.clear();
                throw "Command not found. Please type either y or n: ";
            }
            
            if (quit === "y") {
                console.clear();
                console.log("Good Bye!");
                wait(2000);
                loggedOut();
                
            }
            if (quit === "n") {
                console.clear();
                console.log("Good Choice!");
                wait(2000);
                //setTimeout(() => {  greet(); }, 20000);
                loggedIn();
            }   
        }
        catch(err) {
            console.clear();
            console.log(err);
            wait(2000);    
        }
    }
}










function wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }









































// EXAMPLE ---------------------------------

function ValidatePassword(password: any)
{
  try
  {
    //Make sure password has at least 5 characters
    if(password.length < 5 )
    {
      throw "SHORT";
    }

    //Make sure password has no more than 10 characters
    if(password.length > 10 )
    {
      throw "LONG";  //too many characters
    }

    //Password ok
    alert("Password Validated!");
  }
  catch(e)
  {
    if(e == "SHORT")
    {
      alert("Not enough characters in password!");
    }
    if(e == "LONG")
    {
      alert("Password contains too many characters!");
    }
  }
}