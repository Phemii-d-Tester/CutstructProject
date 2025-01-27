let inboxId = '9beec8ed-a1ec-4ad6-b69f-765b1df46d8d'
let emailAdress
let emailBody
let otpValue

let loc

before(() => {
    cy.fixture('SignInElements').then((signInElements) => {
        loc = signInElements
    })
    
})

Cypress.Commands.add('Login', () => {
    
    cy.get(loc.FirstSignInBtn).should('be.visible').click();
    cy.get(loc.EmailField).should('be.visible').type('db62559d-6ddc-4295-9453-7071876d6f01@mailslurp.net');
    cy.get(loc.PasswordField).should('be.visible').type('Hbon@1234');
    cy.get(loc.SignInButton).should('be.visible').click();
});

Cypress.Commands.add('ClickForgotPasswordButton', () => {
    cy.get(loc.FirstSignInBtn).click();
    cy.get(loc.ResetPasswordBtn).should('be.visible').click();
})

Cypress.Commands.add('RetrieveAndEnterEmailAddress', () => {
    cy.mailslurp().then((mailslurp) => {
        return mailslurp.getInbox(inboxId);
    })
        .then(inbox => {
            emailAdress = inbox.emailAddress
            cy.get('input[placeholder="yourname@example.com"]').type(emailAdress)
        });

})


Cypress.Commands.add('ClickResetPasswordButton', () => {
    cy.get(loc.SignInButton).should('be.visible').click();
});

Cypress.Commands.add('EnterNewPassword', () => {
    cy.get(loc.PasswordField).eq('0').type('Hbon@1234')
    cy.get(loc.PasswordField).eq('1').type('Hbon@1234')
});

Cypress.Commands.add('RetrieveAndEnterOTP', () => {
    cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 30000, true))
        .then(email => {
            emailBody = email.body

            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const otp = doc.querySelector('strong').textContent.trim();
            cy.get('[placeholder="Enter OTP"]').type(otp)
            console.log(otp);
        

        });
});










