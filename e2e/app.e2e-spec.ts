import { RecipesPage } from './app.po';

describe('recipes App', function() {
  let page: RecipesPage;

  beforeEach(() => {
    page = new RecipesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
