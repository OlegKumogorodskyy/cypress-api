/// <reference types="cypress" />
describe("API Tests", () => {
  it("GET all posts", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
      }
    );
  });
  it("GET posts to check array and keys", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.include.keys("userId", "id", "title");
      }
    );
  });

  it("GET a single post by ID", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", 1);
      }
    );
  });

  it("POST a new todo and check response", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/todos",
      body: {
        title: "new todo",
        completed: true,
        userId: 3,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include({ title: "new todo", completed: true });
    });
  });

  it("GET a specific user and validate", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/users/1").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include.keys("username", "email");
      }
    );
  });

  it("PUT update an album and validate", () => {
    cy.request({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/albums/1",
      body: { title: "Updated Title" },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Updated Title");
    });
  });

  it("GET all posts and check the first post's user ID", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts")
      .its("body.0")
      .its("userId")
      .should("exist");
  });

  it("DELETE a comment and check status", () => {
    cy.request(
      "DELETE",
      "https://jsonplaceholder.typicode.com/comments/1"
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
