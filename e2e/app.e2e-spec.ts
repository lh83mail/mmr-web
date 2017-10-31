import { MmrWebPage } from './app.po';

describe('mmr-web App', () => {
  let page: MmrWebPage;

  beforeEach(() => {
    page = new MmrWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
