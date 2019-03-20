/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogListService } from './blogList.service';

describe('Service: BlogList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogListService]
    });
  });

  it('should ...', inject([BlogListService], (service: BlogListService) => {
    expect(service).toBeTruthy();
  }));
});
