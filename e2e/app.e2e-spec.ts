import { Rxjs1Page } from './app.po';

describe('rxjs1 App', () => {
  let page: Rxjs1Page;

  beforeEach(() => {
    page = new Rxjs1Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
