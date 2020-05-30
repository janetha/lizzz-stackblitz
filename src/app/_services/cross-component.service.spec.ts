import { TestBed } from '@angular/core/testing';

import { CrossComponentService } from './cross-component.service';

describe('CrossComponentService', () => {
  let service: CrossComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
