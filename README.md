<h1>Library CLI Group Green</h1>

[Link to the assignment](https://gitlab.com/buutcampsprint/typescript2020/exercises-and-examples/-/blob/master/week-2-ts-strings-arrays-objects/exercises/Group%20Assignments%202%20Library%20CLI.md).


- [ ] F2.2 Borrow book UI
- [ ] F2.3 Return book
- [ ] F1.4 Extra: Change name
- [ ] F1.5 Extra: Remove account
- [ ] B2.X Extra TS: Type guard

<br>

- [x] {+ B1.1 Load books.json +}
- [x] {+ B1.2 Save books.json +}
- [x] {+ B1.3 Get book +}
- [x] {+ B1.4 Print book details +}
- [x] {+ B1.5 Print date +}
- [x] {+ B2.1 Load users.json +}
- [x] {+ B2.2 Save users.json +}
- [x] {+ B2.3 User ID generator +}
- [x] {+ F0.1 Welcome message +}
- [x] {+ F0.2 Help +}
- [x] {+ F0.3 Quit +}
- [x] {+ F1.1 Signup +}
- [x] {+ F1.2 Login +}
- [x] {+ F1.3 Logout +}
- [x] {+ F2.1 List borrowed books +}

<br>

<h1>Initialise</h1>

```
npm init -y  // generates package.json file
tsc --init  // generates tsconfig.json file
npm install --save-dev @types/node  // TypeScript stuff
npm install readline-sync  // TypeScript needs this
npm install @types/readline-sync  // TypeScript needs this

// NOTE
Shorthand versions: -D is short for --save-dev and -S is short for --save
```

Note! if some packages are missing try `npm install`

<br>
<h1>Run</h1>

```
npx ts-node file.ts  // Local TypeScript
ts-node file.ts  // Global TypeScript
```

<br>
<h1>Git</h1>

<h3>GitLab workflow reminder</h3>


**Commit local repo and push to remote repo**
```
git add .
git commit -m "Commit message"
git pull
git push

```

**Git global setup**
```
git config --global user.name "user name"
git config --global user.email "user email"
```

**.gitignore**
```
touch .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
```
