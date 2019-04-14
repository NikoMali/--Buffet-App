/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadImegeService } from './uploadImege.service';

describe('Service: UploadImege', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImegeService]
    });
  });

  it('should ...', inject([UploadImegeService], (service: UploadImegeService) => {
    expect(service).toBeTruthy();
  }));
});
