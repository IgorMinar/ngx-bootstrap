import { AccordionPo } from '../support/accordion.po';

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  it('Accordion page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to accordion component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', 'Accordion');
    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion');
  });

  it('usage example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', 'Usage');
    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('simple accordion example contains title, accordion demo example and code sample', () => {
    // getting array with demo examples blocks
    cy.get('examples').children('div').as('examplesArray')
      // getting simple accordion block
      .children('h3').contains(`${ accordion.exampleTitles[0]}`).parent().as('simpleAccordionBlock')
      .should('be.visible');

    cy.get('@simpleAccordionBlock').children('ng-sample-box').children('.section').as('simpleDemoSection')
      .eq(0).children('demo-accordion-basic')
      .should('to.exist');

    cy.get('@simpleDemoSection').eq(1)
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('disabled accordion example contains title, accordion demo example and code sample', () => {
    // getting disabled block
    cy.get('@examplesArray').children('h3').contains(`${ accordion.exampleTitles[1]}`)
      .parent().as('disabledDemoSection')
      .should('be.visible');

    cy.get('@simpleAccordionBlock').children('ng-sample-box').children('.section').as('disabledDemoSection')
      .eq(0).children('demo-accordion-disabled')
      .should('to.exist');

    cy.get('@disabledDemoSection').eq(1)
      .should('be.visible')
      .and('not.to.be.empty');
  });
});
