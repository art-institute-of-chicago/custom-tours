import React from "react";
import TourMetadata from "./TourMetadata";
import { AppProvider } from "../../contexts/AppContext";

describe("<TourMetadata />", () => {
  it("Renders", () => {
    cy.mount(
      <AppProvider>
        <TourMetadata />
      </AppProvider>,
    );
    cy.get("#aic-ct-metadata__title").should("exist");
    cy.get("#aic-ct-metadata__description").should("exist");
    cy.get('label[for="aic-ct-metadata__title"]').should(
      "contain.text",
      "(255 characters remaining)",
    );
    cy.get('label[for="aic-ct-metadata__description"]').should(
      "contain.text",
      "(255 characters remaining)",
    );
  });

  it("Can update each field", () => {
    const titleText = "Maecenas vulputate, ligula id tincidunt.";
    const descriptionText = "Morbi pretium rhoncus libero massa nunc.";

    cy.mount(
      <AppProvider>
        <TourMetadata />
      </AppProvider>,
    );
    // This is 40 characters including spaces and punctuation
    cy.get("#aic-ct-metadata__title").type(titleText, { delay: 0 });

    cy.get("#aic-ct-metadata__creator-name").type("Jon", { delay: 0 });
    cy.get("#aic-ct-metadata__creator-email").type("jonw@coghack.com");
    cy.get("#aic-ct-metadata__recipient-name").type("Luke");

    // This is 40 characters including spaces and punctuation
    cy.get("#aic-ct-metadata__description").type(descriptionText, { delay: 0 });
    // 255 - 40 = 215
    cy.get('label[for="aic-ct-metadata__title"]').should(
      "contain.text",
      "(215 characters remaining)",
    );
    // 255 - 40 = 215
    cy.get('label[for="aic-ct-metadata__description"]').should(
      "contain.text",
      "(215 characters remaining)",
    );
    cy.get("#aic-ct-metadata__title").should(
      "have.value",
      titleText.slice(0, 40),
    );
    cy.get("#aic-ct-metadata__description").should(
      "have.value",
      descriptionText.slice(0, 40),
    );

    cy.get("#aic-ct-metadata__opt-in").check().should("be.checked");
  });

  it("Can add the maxLength text to an input field", () => {
    const titleText =
      "Suspendisse posuere facilisis dignissim. Quisque feugiat dolor justo. Quisque nec interdum libero. Vivamus sapien sem, varius id facilisis lobortis, lobortis id leo. Morbi venenatis molestie ultricies. Sed efficitur accumsan risus, quis euismod metus dui.";

    cy.mount(
      <AppProvider>
        <TourMetadata />
      </AppProvider>,
    );
    // This is 255 characters including spaces and punctuation
    cy.get("#aic-ct-metadata__title").type(titleText, { delay: 0 });

    cy.get('label[for="aic-ct-metadata__title"]').should(
      "contain.text",
      "(0 characters remaining)",
    );
    cy.get("#aic-ct-metadata__title").should("have.value", titleText);
  });

  it("Will stop allowing input after the maxLength", () => {
    const titleText =
      "Nullam aliquet fringilla dolor, vitae malesuada massa rutrum eget. Quisque sed nibh augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque tristique finibus sapien, condimentum condimentum magna biam.";

    cy.mount(
      <AppProvider>
        <TourMetadata />
      </AppProvider>,
    );
    // This is 257 characters including spaces and punctuation
    cy.get("#aic-ct-metadata__title").type(titleText, { delay: 0 });
    // 255 - 257 = -2 (0)
    cy.get('label[for="aic-ct-metadata__title"]').should(
      "contain.text",
      "(0 characters remaining)",
    );
    cy.get("#aic-ct-metadata__title").should(
      "have.value",
      titleText.slice(0, 255),
    );
  });
});
