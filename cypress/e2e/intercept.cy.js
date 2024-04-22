/// <reference types="cypress" />
import profile from "../fixtures/profile.json";
describe("Profile Page Test", () => {
  it("Logs in and verifies profile data", () => {
    cy.intercept("https://qauto.forstudy.space/api/users/profile", profile).as('profile');
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.contains("Sign In").click();
    cy.get("#signinEmail").type("kyym13@gmail.com");
    cy.get("#signinPassword").type("Gost1234");
    cy.contains("Login").click();
    cy.get('a[routerlink="profile"]').click();
    cy.url().should("include", "/panel/profile");
    cy.get("p.profile_name.display-4").should("be.visible");

    cy.wait('@profile').then((obj)=> {
        console.log(obj)
    })
    cy.get("p.profile_name.display-4").should("have.text", "Polar Bear");
    cy.get("span.profile-info_text").contains("USA").should("exist");
    cy.get("span.profile-info_text").contains("11.11.2011").should("exist");
  });
});
