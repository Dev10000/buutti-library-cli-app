const fs = require('fs')
const MIN: number = 2
const MAX: number = 25
const USERS = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const BOOKS = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, 'utf-8'))

class User {
  private name: string
  private password: string
  private id: number
  private books: string[]
  private books_history: string[]
  private role: string
  // private books_id: number

  constructor () {
    this.name = this.getFullName
    this.password = this.getPassword
    this.id = this.getRandomId()
    this.books = this.getBooks
    this.books_history = this.getBooksHistory
    this.role = this.getRole
  }

  // USER CRUD STARTS HERE

  // Create one user

  public createUser () {
    const user = {
      name: this.getFullName,
      password: this.getPassword,
      id: this.getId,
      books: this.getBooks,
      books_history: this.getBooksHistory,
      role: this.getRole
    }
    USERS.push(user)
    fs.writeFile(
      `${__dirname}/users.json`,
      JSON.stringify(USERS),
      'utf-8',
      err => {
        if (err) throw err
        console.log(`A new user with id: ${user.id} has been added`)
        return User.getAllUsers()
      }
    )
  }

  // Fetch all users

  public static getAllUsers () {
    if (USERS.length < 1) {
      return 'There are no users available'
    }
    return USERS
  }

  //  Fetch one user

  public static getUser (id: number) {
    if (USERS.length > 0) {
      const user = USERS.filter(el => {
        return parseInt(el.id) === id
      })
      if(user.length > 0) {
        return user
      }
      throw new Error(`No user with the id: ${id}`)
    }
    return 'There are no users'
  }

  // Edit user

  public editUser (id: number) {
    if (USERS.length > 0) {
      USERS.filter(el => {
        if (parseInt(el.id) === id) {
          const user = {
            name: this.setFullName,
            password: this.setPassword,
            books: this.setBooks,
            books_history: this.setBooksHistory
          }
          // fs.writeFile(`${__dirname}/users.json`, )
          console.log(user)
          return user
        }
      })
    }
  }

  // Delete user

  public deleteUser (id: number) {
    if (USERS.length > 0) {
      const allUser = USERS.filter(el => {
        if (el.id === id) {
          const user = USERS.indexOf(el)
          USERS.splice(user, 1)
          fs.writeFile(
            `${__dirname}/users.json`,
            JSON.stringify(USERS),
            'utf-8',
            err => {
              if (err) throw err
            }
          )
          console.log(`User with id: ${id} has been deleted`)
          return User.getAllUsers()
        }
      })
      if(allUser.length > 0) {
        return allUser
      }
        throw new Error(`No user with the id: ${id}`)
    }
  }

  set setFullName (newName: string) {
    const pattern = /^((\s*[a-zA-Z]+\s*)|((\s*[a-zA-Z]+)(\s[a-zA-Z]+)))$/g
    if (newName) {
      if (newName.length < MIN) {
        throw new Error('The name is too short')
      } else if (newName.length > MAX) {
        throw new Error('The name is too long')
      } else if (!pattern.test(newName)) {
        throw new Error('Invalid name format')
      }
      this.name = newName.toUpperCase().trim()
    }
  }

  get getFullName (): string {
    return this.name
  }

  set setPassword (password: string) {
    if (password === '') {
      throw new Error('The password is required')
    } else if (password.length < MIN) {
      throw new Error('The password is too short')
    } else if (password.length > MAX) {
      throw new Error('The password is too long')
    }
    this.password = password
  }

  get getPassword (): string {
    return this.password
  }

  set setId (id: number) {
    if (id < 1) {
      throw new Error('The id cannot be a negative integer')
    }
    this.id = id
  }

  get getId (): number {
    return this.id
  }

  set setBooks (books: string[]) {
    if (!books) {
      throw new Error('The instance of books must be an array')
    }
    this.books = books
  }

  get getBooks () {
    return this.books
  }

  set setBooksHistory (books_history: string[]) {
    if (!books_history) {
      throw new Error('The instance of books must be an array')
    }
    this.books_history = books_history
  }

  get getBooksHistory (): string[] {
    return this.books_history
  }

  set setRole (role: string) {
    if (role === '') {
      role = 'subscriber'
    }
    this.role = role
  }

  get getRole () {
    return this.role
  }

// Get user strictly by name

  public findByName (data: string) {
    if(USERS.length > 0) {
      const user = USERS.filter(el => {
        return el.name === data.toUpperCase()
      });
      if(user.length > 0) {
        return user
      }
      throw new Error(`No users with name ${data}`)
    }
    return 'There are no users'
  }

  // Insert books

  public borrowBooks(id: number, books_id: number[]) {
    const user = User.getUser(id)
    const book = BOOKS.filter(el => {
      return el.isbn === books_id
    })
    if(book.length > 0) {
      return book
    }
    throw new Error(`No books with the id: ${books_id}`)
  }

  public fetchBooks() {
    if (BOOKS.length < 1) {
      return 'There are no users available'
    }
    return BOOKS
  }

  public getRandomId () {
    return 10 * Date.now()
  }

  
}


