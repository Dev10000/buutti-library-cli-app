const readLine = require('readline-sync');
const USER = require('./userController')

class UI {
  constructor() {
    this.greet()
  }

  public greet() {
    let welcome = readLine.question(`$ Welcome to Green library!\n$ Get the list of available commands by typing 'help'.`)
    if(welcome === 'help') {
      console.log(`$ help => Prints this listing.\n$ quit => Quits the program.\n$ search => Opens a dialog for searching for a book in the library system.`)
    } 
  }

  public askLogin () {
    let login = readLine.question(`$ If you've registered, please login with your id: `)
    if(login == '0000') {
      console.log(`Welcome, your id: ${login} is valid`)
    } else {
      console.log('Your id is invalid, please try agin')
    }
    return login
  }
}

const user = new USER

