import { TestBed, inject } from '@angular/core/testing';

import { WebcamService } from './webcam.service';

describe('WebcamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebcamService]
    });
  });

  it('should be created', inject([WebcamService], (service: WebcamService) => {
    expect(service).toBeTruthy();
  }));
});
