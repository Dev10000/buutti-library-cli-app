<h1>Library CLI Group Green</h1>

[Link to the assignment](https://gitlab.com/buutcampsprint/typescript2020/exercises-and-examples/-/blob/master/week-2-ts-strings-arrays-objects/exercises/Group%20Assignments%202%20Library%20CLI.md).

### Features currently implemented / planned
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
- [x] {+ F1.4 Extra: Change name +}
- [x] {+ F1.5 Extra: Remove account +}
- [x] {+ F2.1 List borrowed books +}
- [x] {+ F2.2 Borrow book UI +}
- [x] {+ F2.3 Return book +}
<br>

- [ ] {- B2.X Extra TS: Type guard -}

<br>

# Install
```
git clone https://gitlab.com/swegen/library-cli-group-green.git
cd library-cli-group-green
npm install
```

<br>

# Run
```
ts-node app.ts  // Globally installed TypeScript
npx ts-node app.ts  // Locally installed TypeScript
```

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
<h1>Git</h1>

<h3>GitLab workflow reminder</h3>

**Clone existing remote repo and start new local dev-branch**

```
1 git clone https://gitlab.com/swegen/library-cli-group-green.git
2 cd library-cli-group-green
3 git branch new-branch-name
4 git checkout new-branch-name
5 git push -u origin new-branch-name

```


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


**Start new local master and dev-branch repo and push to remote repo**

```
1. create new folder
2. git init - to make a new repository
3. work your project
4. git add .
5. git commit -m "Init commit"
6. git checkout -b dev-branch-name
7. git push https://gitlab.com/swegen/library-cli-group-green.git dev-branch-name - This makes new branch in remote repo

```

**Extra Commands**

```
To view the branches in a Git repository, run the command:
git branch
git branch options
-v or -vv or --verbose
-a or --all show the local branches as well as any remote branches for a repository.
-r or --remotes show only the remote branches, use the option.

Rename a Branch
git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME
# Alternative
git branch --move OLD-BRANCH-NAME NEW-BRANCH-NAME

Delete a Branch
Git won’t let you delete a branch that you’re currently on. You first need to checkout a different branch, then run the command:
git branch -d BRANCH-TO-DELETE
# Alternative:
git branch --delete BRANCH-TO-DELETE

Compare Branches
git diff FIRST-BRANCH..SECOND-BRANCH

To update a local branch from remote:
git stash  --(optional, to save local changes which differs from the remote repository if any) 

Finally pull from the remote branch
git pull

Track a Remote Branch
If you already have a branch and you want to track a remote branch, then you use set-upstream-to command:
git branch --set-upstream-to origin/BRANCH

Or you can use the -u flag (upstream) when you make your first push:
git push -u origin BRANCH

Help with Git Branch

If you forget how to use an option, or want to explore other functionality around the git branch command, you can run any of these commands:

git help branch
git branch --help
man git-branch


```





