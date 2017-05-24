import { A2ProjPage } from './app.po';

describe('a2-proj App', () => {
  let page: A2ProjPage;

  beforeEach(() => {
    page = new A2ProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
