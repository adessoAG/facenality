import { LegalAndFurtherModule } from './legal-and-further.module';

describe('LegalAndFurtherModule', () => {
  let legalAndFurtherModule: LegalAndFurtherModule;

  beforeEach(() => {
    legalAndFurtherModule = new LegalAndFurtherModule();
  });

  it('should create an instance', () => {
    expect(legalAndFurtherModule).toBeTruthy();
  });
});
