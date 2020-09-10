import { isArray } from "util";

const fs = require('fs');
const MIN: number = 2;
const MAX: number = 25;
const USERS = JSON.parse(fs.readFileSync('../users.json'));

class User {
 private name: string;
 private password: string;
 private id: number = 1;
 private books: string[];
 private books_history: string[];

 constructor() {
   this.getAllUsers();
   this.name = this.getFullName;
   this.password = this.getPassword;
   this.id = this.getId;
   this.books = this.getBooks;
   this.books_history = this.get_books_history;
 }

//  Fetch all users

 public getAllUsers() {
   if(USERS.length < 1) {
     return 'There are no users available';
   } 
   return USERS;
 }

//  Fetch one user 



 set setFullName(newName: string) {
   const pattern = /^(([a-zA-Z]+\s*)|(([a-zA-Z]+)(\s[a-zA-Z]+)))$/g;
   if(newName) {
    if(newName.length < MIN) {
      throw new Error('The name is too short');
    } else if(newName.length > MAX) {
      throw new Error('The name is too long');
    } else if(!pattern.test(newName)) {
      throw new Error('Invalid name format');
    }
    this.name = newName.toUpperCase().trim();
   }
 }

 get getFullName(): string {
  return this.name;
 }

 set setPassword(password: string) {
  if(password !== '') {
    if(password.length < MIN) {
      throw new Error('The password is too short');
    } else if(password.length > MAX) {
      throw new Error('The password is too long');
    }
    this.password = password.trim();
  }
 }

 get getPassword(): string {
   return this.password;
 }

 set setId(id: number) {
   if(id < 0) {
    throw new Error('The id cannot be negative integer');
   }
   this.id = id;
 }

 get getId(): number {
   return this.id;
 }

 set set_books(books: string[]) {
   if(!isArray(books)) {
     throw new Error('The instance of books must be an array');
   }
   this.books = books;
 }

 get getBooks() {
   return this.books;
 }

 set set_books_history(books_history: string[]) {
   if(!isArray(books_history)) {
     throw new Error('The instance of books must be an array');
   }
   this.books_history = books_history;
 }

 get get_books_history(): string[] {
   return this.books_history;
 }

}

// const user = new User(); 
// user.setFullName = 'oladapo ';
// user.set_books = ['My First Book', 'My Second Book'];
// user.set_books_history = ['First Book'];
// user.setId = 20;
// user.setPassword = 'these';
// // console.log(user.getUser(1));

// console.log(user);







