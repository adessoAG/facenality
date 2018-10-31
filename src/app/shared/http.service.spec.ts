import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should post the correct data', () => {
    service.sendQuestionnaire({ "id": "1" })
      .subscribe((id: string) => {
        expect(id).toBe("1");
      });

    const req = httpMock.expectOne(
      `localhost:8080`,
      'post to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush({
      "id": "1",
    });

    httpMock.verify();
  });
});
