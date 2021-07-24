
describe('User Onboarding Form Test', () => {
    
    it('sanity test', () => {
        expect(1+2).to.equal(3)
    })

    it('Visits Site', () => {
        cy
        .visit('http://localhost:3000/')
    })
it('Username Input Test', () => {
    cy
    .get('input[name="username"]')
    .type('Gabe Morris')
})
it('Username Assertion', () => {
cy.get('input[name="username"').should('have.value','Gabe Morris')
})
it('Email Input Test', () => {
    cy
    .get('input[name="email"]')
    .type('gabe.e.morris@gmail.com')
})
it('Password Input Test', () => {
cy
.get('input[name="password"]')
.type('randompassword')
})
it('TOS Check Test', () => {
cy
.get('[type="checkbox"]')
.check()
})
it('Form Submission Test', () => {
    cy.get('form').submit()
})
})