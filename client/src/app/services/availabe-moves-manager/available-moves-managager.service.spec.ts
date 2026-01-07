import { TestBed } from '@angular/core/testing';

import { AvailableMovesManagagerService } from './available-moves-managager.service';

describe('AvailableMovesManagagerService', () => {
  let service: AvailableMovesManagagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableMovesManagagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
