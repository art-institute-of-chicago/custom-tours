import React from "react";
import SearchResultItem from "./SearchResultItem";
import item from "../../cypress/fixtures/json/item.json";
import { AppProvider } from "../contexts/AppContext";

describe("<SearchResultItem />", () => {
  it("Renders", () => {
    cy.intercept(
      "GET",
      "https://artic.edu/iiif/2/test_image_id/full/!240,240/0/default.jpg",
      {
        fixture: `../../cypress/fixtures/images/image_${
          Math.floor(Math.random() * 10) + 1
        }.jpg`,
      },
    );
    cy.mount(
      <AppProvider>
        <SearchResultItem key={item.id} itemData={item} />
      </AppProvider>,
    );
    cy.get("#aic-ct-search__item-1 img")
      .should(
        "have.attr",
        "src",
        "https://artic.edu/iiif/2/test_image_id/full/!240,240/0/default.jpg",
      )
      .should("have.attr", "alt", "Test image alt text");
  });
  it("Can toggle itself from the tour", () => {
    cy.mount(
      <AppProvider>
        <SearchResultItem key={item.id} itemData={item} />
      </AppProvider>,
    );
    cy.get("#aic-ct-search__item-1 button")
      .should("exist")
      .should("have.text", "Add to tour")
      .should("have.attr", "aria-pressed", "false")
      .click()
      .should("have.text", "Remove from tour")
      .should("have.attr", "aria-pressed", "true");
  });
});