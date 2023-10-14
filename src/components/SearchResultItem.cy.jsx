import React from "react";
import SearchResultItem from "./SearchResultItem";
import item from "../../cypress/fixtures/json/item.json";

describe("<SearchBar />", () => {
  it("Renders", () => {
    cy.intercept(
      "GET",
      "https://artic.edu/iiif/2/test_image_id/full/!240,240/0/default.jpg",
      {
        fixture: "/images/image_1.jpg",
      },
    );
    cy.mount(
      <SearchResultItem
        key={item.id}
        id={item.id}
        item={item}
        iiifBaseUrl="https://artic.edu/iiif/2"
      />,
    );
    cy.get("#aic-ct-search__item-1 img")
      .should(
        "have.attr",
        "src",
        "https://artic.edu/iiif/2/test_image_id/full/!240,240/0/default.jpg",
      )
      .should("have.attr", "alt", "Test image alt text");
  });
});
