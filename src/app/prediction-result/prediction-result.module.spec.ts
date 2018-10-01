import { PredictionResultModule } from './prediction-result.module';

describe('PredictionResultModule', () => {
  let predictionResultModule: PredictionResultModule;

  beforeEach(() => {
    predictionResultModule = new PredictionResultModule();
  });

  it('should create an instance', () => {
    expect(predictionResultModule).toBeTruthy();
  });
});
