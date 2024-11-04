/// <reference = cypress>

describe("Tests including, creation, registers and login", () => {
  beforeEach(() =>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  })
  
  it("should create an user account succesfully", () => {
    cy.get('a[href="#/register"]').click()
    cy.get('input[name="firstName"]').type('Marcos')
    cy.get('input[name="lastName"]').type('Henrique')
    cy.get('input[name="username"]').type('Marcos.h')
    cy.get('input[name="password"]').type('123teste321')
    cy.get('button[type="submit"]').click()
    cy.get('.alert-success').should('contain.text', 'Registration successful')
  })

  it("should login with an user account succesfully", () => {
    let userData = createUser()
    cy.get('input[name="username"]').type(userData[0])
    cy.get('input[name="password"]').type(userData[1])
    cy.get('button[type="submit"]').click()
    cy.get('h1.ng-binding').should('contain.text', userData[0])
  })

  it("should not login with an user account", () => {
    let userData = createUser()
    cy.get('input[name="username"]').type(userData[0])
    cy.get('input[name="password"]').type('123teste3214')
    cy.get('button[type="submit"]').click()
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')
  })

  it("should not create an user account with an existing username", () => {
    let userData = createUser()
    cy.get('a[href="#/register"]').click()
    cy.get('input[name="firstName"]').type(userData[0])
    cy.get('input[name="lastName"]').type(userData[0])
    cy.get('input[name="username"]').type(userData[0])
    cy.get('input[name="password"]').type(userData[1])
    cy.get('button[type="submit"]').click()
    cy.get('.ng-binding').should('contain.text', 'Username "'+userData[0]+'" is already taken')
  })

  it("should delete an user account succesfully", () => {
    let userData = createUser()
    cy.get('input[name="username"]').type(userData[0])
    cy.get('input[name="password"]').type(userData[1])
    cy.get('button[type="submit"]').click()
    cy.get('h1.ng-binding').should('contain.text', userData[0])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.wait(500)
    cy.get('h2').should('contain.text', 'Login')
  })
})

function createUser(){
  let hour = new Date().getHours().toString()
  let minute = new Date().getMinutes().toString()
  let second = new Date().getSeconds().toString()

  let username = 'Marcos.h' + hour + minute + second + "ID"
  let password = '123teste321' + hour + minute + second + "Pass"

  let userData = [username, password]


  cy.get('a[href="#/register"]').click()
  cy.get('input[name="firstName"]').type(username)
  cy.get('input[name="lastName"]').type(username)
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.wait(3000)
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userData
}