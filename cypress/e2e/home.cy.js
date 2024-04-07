/// <reference types="cypress" />

describe("Home page renders", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("https://api.thecatapi.com/v1/breeds?limit=100&page=0", {
      fixture: "breeds.json",
    }).as("breeds");

    cy.intercept("https://api.thecatapi.com/v1/favourites?order=DESC", {
      fixture: "favourites.json",
    });
  });

  it("Should show a filter bar with controls", () => {
    cy.get("[data-cy=filter-wrapper]").should("exist");
    cy.get("[data-cy=cats-dropdown]").should("exist").click();
    cy.get("[data-cy=slider]").should("exist").contains("Number of cats");
  });

  it("Should show a list of cats", () => {
    cy.wait(1000);
    cy.get("[data-cy=cat-item]").should("have.length", 15);
  });

  it("Should navigate to favorites page", () => {
    cy.get("[data-cy=Favorites]").click();
    cy.location("pathname", { timeout: 1000 }).should("eq", "/favorites");
  });

  it("Delete button should open correct modal and then delete cat", () => {
    cy.get("[data-cy=delete-button]").first().click();
    cy.get("h2").contains("Delete this cat?").should("exist");
    cy.get("button").contains("Delete").click();
    cy.get("[data-cy=cat-item]").should("have.length", 14);
  });

  it("Favorite button should add cat to favorites", () => {
    cy.get("[data-cy=favourite-button]").first().click();
    cy.get("[data-cy=cat-item]")
      .first()
      .find("[data-cy=HiHeart]")
      .should("exist");
    cy.get("[data-cy=favourite-button]").first().click();
    cy.get("button").contains("Remove").click();
    cy.get("[data-cy=cat-item]")
      .first()
      .find("[data-cy=HiOutlineHeart]")
      .should("exist");
  });

  it("Slider should change number of cats", () => {
    cy.get("[data-cy=slider]").should("be.visible");
    cy.get('[data-cy=slider] [data-slot="track"]').click("left");
    cy.get("[data-cy=cat-item]").should("have.length", 5);
  });
});
