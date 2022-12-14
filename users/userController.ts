const fs = require('fs')
const MIN: number = 2
const MAX: number = 25
const PATTERN = /^((\s*[a-zA-Z]+\s*)|((\s*[a-zA-Z]+)(\s[a-zA-Z]+)))$/g


type Person = {
  name: string
  password: string
  id: number
  books_id: string[]
  isbn: string[]
};

const USERS: Person[] = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

class User  {

  // USER PROPERTIES

  private name: string
  private password: string
  private id: number
  private books_id: string[] = ['default']
  private isbn: string[] = ['default']

  constructor () {
    this.name = this.getFullName
    this.password = this.getPassword
    this.id = this.getRandomId()
    this.books_id = this.getBooksId
    this.isbn = this.getBooksIsbn
  }

  // SETTERS

  set setFullName (newName: string) {
    if (newName) {
      if (newName.length < MIN) {
        throw new Error('The name is too short')
      } else if (newName.length > MAX) {
        throw new Error('The name is too long')
      } else if (!PATTERN.test(newName)) {
        throw new Error('Invalid name format')
      }
      this.name = newName.trim()
    }
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

  set setBooksId(id: string[]) {
    if(!id) {
      throw new Error(`The book's id is required`)
    } else if(id == null) {
      id = this.books_id
    }
    this.books_id = id
  }

  set setId (id: number) {
    if (id < 1) {
      throw new Error('The id cannot be a negative integer')
    }
    this.id = id
  }

  set setBooksIsbn(isbn: string[]) {
    if(!isbn) {
      throw new Error('The isbn number is required')
    } else if(isbn == null) {
      isbn = this.isbn
    }
    this.isbn = isbn
  }

  // GETTERS 

  get getFullName (): string {
    return this.name
  }

  get getPassword (): string {
    return this.password
  }

  get getId (): number {
    return this.id
  }
  
  get getBooksIsbn() {
    return this.isbn
  }

  get getBooksId() {
    return this.books_id
  }

  public getRandomId () {
    return 10 * Date.now()
  }

  // USER CRUD STARTS HERE

  // Create user

  public  createUser () {
      const user: Person = {
        name: this.getFullName,
        password: this.getPassword,
        id: this.getId,
        books_id: this.getBooksId,
        isbn: this.getBooksIsbn
      };
       USERS.push(user)
      fs.writeFileSync(
        `${__dirname}/users.json`,
        JSON.stringify(USERS),
        'utf-8', (err: any) => {
          if(err) throw err
        })
        return User.getAllUsers()
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
    if(id) {
      const user =  USERS.find(el => {
        if(el.id === id) {
          return {
            name: el.name,
            password: el.password,
            id: el.id,
            books_id: el.books_id,
            isbn: el.isbn
          }
        }
      })
      return user ? user : `There is no user with the id: ${id}`
    }
    return 'Please provide a valid id'
  }

  // Change name

  public changeName(id: number, name: string) {
    const user = USERS.find(el => {
      if(el.id === id) {
        if(!PATTERN.test(name)) {
          throw new Error('Invalid name format')
        }
        const source = {
          name: name.trim()
        }
        const target = {
          name: el.name,
          password: el.password,
          id: el.id,
          books_id: el.books_id,
          isbn: el.isbn
        }
        USERS.splice(USERS.indexOf(el), 1, Object.assign(target, source))
        fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(USERS), 'utf-8', (err: any) => {
          if(err) throw err
        })
      }
    })
    return user
  }

  // Delete user

  public static deleteUser (id: number) {
    if (USERS.length > 0) {
      const allUser = USERS.filter(el => {
        if (el.id === id) {
          const user = USERS.indexOf(el)
          USERS.splice(user, 1)
          fs.writeFileSync(
            `${__dirname}/users.json`,
            JSON.stringify(USERS),
            'utf-8',
            (err: any) => {
              if (err) throw err
            }
          )
          return User.getAllUsers()
        }
      })
      if(allUser.length > 0) {
        return allUser
      }
        throw new Error(`No user with the id: ${id}`)
    }
  }

  // Insert books 

  public insertBook(bookIsbn: string, bookId: string, userId: number) {
    if(bookIsbn && bookId) {
       return USERS.filter(el => {
        if(el.id === userId) {
          el.books_id.push(bookId)
          el.isbn.push(bookIsbn)
          fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(USERS.splice(USERS.indexOf(el), 1, el)), 'utf-8', (err: any) => {
            if(err) throw err
          }) 
        }
      })
    }
  }
  
}

module.exports = User
