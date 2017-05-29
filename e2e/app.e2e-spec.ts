import { SearchAppPage } from './app.po';

describe('search-app App', function() {
  let page: SearchAppPage;

  beforeEach(() => {
    page = new SearchAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
