import { AngularSrcPage } from './app.po';

describe('angular-src App', () => {
  let page: AngularSrcPage;

  beforeEach(() => {
    page = new AngularSrcPage();
  });

  it('should display message saying MEAN', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('MEAN');
  });
});
