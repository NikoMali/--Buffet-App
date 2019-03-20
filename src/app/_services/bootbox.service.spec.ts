/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BootboxService } from './bootbox.service';

describe('Service: Bootbox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootboxService]
    });
  });

  it('should ...', inject([BootboxService], (service: BootboxService) => {
    expect(service).toBeTruthy();
  }));
});
