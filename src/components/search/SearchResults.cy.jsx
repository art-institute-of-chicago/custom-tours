import React from "react";
import SearchResults from "./SearchResults";
import item from "../../../cypress/fixtures/json/item.json";
import { AppProvider } from "../../contexts/AppContext";
import { SearchProvider } from "../../contexts/SearchContext";

describe("<SearchResults />", () => {
  it("Renders initially empty", () => {
    cy.mount(
      <AppProvider>
        <SearchProvider
          searchError={false}
          searchResultItems={null}
          searchFetching={false}
        >
          <SearchResults />
        </SearchProvider>
      </AppProvider>,
    );
    cy.get("#aic-ct-search-results__items").should("not.exist");
  });

  it("Renders error message", () => {
    cy.mount(
      <AppProvider>
        <SearchProvider
          searchError={"Error loading results"}
          searchResultItems={null}
          searchFetching={false}
        >
          <SearchResults />
        </SearchProvider>
      </AppProvider>,
    );
    cy.get("#aic-ct-search-results__error").should(
      "have.text",
      "Error loading results",
    );
  });

  it("Renders loading message", () => {
    cy.mount(
      <AppProvider>
        <SearchProvider
          searchError={false}
          searchResultItems={null}
          searchFetching={true}
        >
          <SearchResults />
        </SearchProvider>
      </AppProvider>,
    );
    cy.get("#aic-ct-search-results__loading").should("have.text", "Loading...");
  });

  it("Renders no results message", () => {
    cy.mount(
      <AppProvider>
        <SearchProvider
          searchError={false}
          searchResultItems={[]}
          searchFetching={false}
        >
          <SearchResults />
        </SearchProvider>
      </AppProvider>,
    );
    cy.get("#aic-ct-search-results__no-results").should(
      "have.text",
      "Sorry, we couldn’t find any results matching your criteria",
    );
  });

  it("Renders a result", () => {
    cy.mount(
      <AppProvider>
        <SearchProvider
          searchError={false}
          searchResultItems={[item]}
          searchFetching={false}
        >
          <SearchResults />
        </SearchProvider>
      </AppProvider>,
    );
    cy.get("#aic-ct-search-results__items").should("exist");
    cy.get("#aic-ct-search-results__items li").should("have.length", 1);
    cy.get("#aic-ct-search-result-count").should("have.text", "1");
  });
});
