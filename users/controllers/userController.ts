

const fs = require('fs')
const MIN: number = 2
const MAX: number = 25

type Person = {
  name: string;
  password: string;
  id: number;
  books: string[];
  is_admin: boolean
  is_logged_in: boolean
};

const USERS: Person[] = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

class User  {
  private name: string
  private password: string
  private id: number
  private books: string[]
  private is_admin: boolean = false
  private is_logged_in: boolean = false

  constructor () {
    this.name = this.getFullName
    this.password = this.getPassword
    this.id = this.getRandomId()
    this.books = this.getBooks
    this.is_admin = this.getIsAdmin
    this.is_logged_in = this.getIsLoggedIn
  }

  // USER CRUD STARTS HERE

  // Create one user

  public  createUser () {
      const user: Person = {
        name: this.getFullName,
        password: this.getPassword,
        id: this.getId,
        books: this.getBooks,
        is_admin: this.getIsAdmin,
        is_logged_in: this.getIsLoggedIn
      };
       USERS.push(user)
      fs.writeFile(
        `${__dirname}/users.json`,
        JSON.stringify(USERS),
        'utf-8', (err: any) => {
          if(err) throw err
        })
        console.log(`A new user with id: ${user.id} has been added`)
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
    if (USERS.length > 0) {
      const user = USERS.filter(el => {
        return (el.id) === id
      })
      if(user.length === 1) {
        return user
      }
      throw new Error(`No user with the id: ${id}`)
    }
    return 'There are no users'
  }

  // Edit user should come  here... not ready yet


  // Delete user

  public static deleteUser (id: number) {
    if (USERS.length > 0) {
      const allUser = USERS.filter(el => {
        if (el.id === id) {
          const user = USERS.indexOf(el)
          USERS.splice(user, 1)
          fs.writeFile(
            `${__dirname}/users.json`,
            JSON.stringify(USERS),
            'utf-8',
            (err: any) => {
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

  set setIsAdmin (data: boolean) {
    if(data === null) {
      data = this.is_admin
    }
    this.is_admin = data
  }

  get getIsAdmin () {
    return this.is_admin
  }

  set setIsLoggedIn(data: boolean) {
    if(data === null) {
      data = this.is_logged_in
    }
    this.is_logged_in = data
  }

  get getIsLoggedIn() {
    return this.is_logged_in
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

  // Login user should come here

  public getRandomId () {
    return 10 * Date.now()
  }

}
// // 1.
// const user = new User();
// // 2.
// user.setFullName = 'Oladapo Oladayo'
// user.setBooks = ['Book 1', 'Book 2']
// // user.setIsAdmin... if this is not set, is_admin will be false
// user.setPassword = 'secret' // This has some length validation
// // user.setIsLoggedIn ... this should be available in the signup method. 
// // The user id is generated automatically, there is no need to set it
// // 3. 
// user.createUser() // This method should be called last when creating a new user

// // Finally, you can pull all the users like below:

// const allUsers = User.getAllUsers() // Please note that this is a static method 
// console.log(allUsers)  


// // Get one user by Id 

// const oneUser = User.getUser(16003503679040) // Please note that this is a static method
// console.log(oneUser) // This should display the user with the above id and so on...



