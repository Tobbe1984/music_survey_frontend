describe('App Component', () => {

  let screensize = Cypress.config('viewportWidth') > 414 ? 'desktop' : 'mobile';

  beforeEach(() => {
    cy.intercept('GET', '/api/v1/instrument', { fixture: 'instruments.json' }).as('getInstruments') // Intercept the request and mock the response
    cy.intercept('GET', '/api/v1/genre', { fixture: 'genres.json' }).as('getGenres') // Intercept the request and mock the response
  })

  describe('Instrument Selection', () => {
    it('should select instruments and navigate to rating page', () => {
      cy.visit('http://localhost:4200') // Visit the root URL of the Angular app

      it('should display the app title', () => {
        cy.get('.mat-toolbar > :nth-child(2)').should('contain.text', 'music-survey-frontend')
      })

      cy.fixture('instruments.json').then((instruments) => {
        for (let i = 0; i < instruments.length; i++) {
          cy.get('.mat-mdc-selection-list .mdc-list-item__content').eq(i).should('contain.text', instruments[i].name);

          cy.get('.mdc-checkbox').eq(i).click();
          cy.get('mat-chip').eq(0).should('contain.text', instruments[i].name);
          cy.get('.mdc-checkbox').eq(i).click();
        }

        cy.get('.mdc-checkbox').eq(1).click();

        // @ts-ignore
        cy.compareSnapshot({
          name: `intruments-${screensize}`,
          testThreshold: 0.0
        })
      });
    })
  })

  describe('Genre Rating', () => {
    before(() => {
      // Re-select instruments to bypass the resolver
      cy.visit('http://localhost:4200');
      cy.fixture('instruments.json').then((instruments) => {
        cy.get('.mdc-checkbox').eq(2).click(); // Select the required instrument
        cy.get('.mdc-button--raised:visible').click();
      });
      cy.url().should('include', '/voting');
    });

    it('should rate all genres', () => {
      cy.fixture('genres.json').then((genre) => {
        for (let i = 0; i < genre.length; i++) {
          cy.get('.mat-mdc-card > div').eq(i).should('contain.text', genre[i].name);

          cy.get('.mat-mdc-card > div').eq(i).find('mat-slider input')
            .invoke('val', 3)
            .trigger('input');
        }
      });

      // @ts-ignore
      cy.compareSnapshot({
        name: `voting-${screensize}`,
        testThreshold: 0.0
      })
    })
  })
})
