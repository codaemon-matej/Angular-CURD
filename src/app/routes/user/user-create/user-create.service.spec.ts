import { TestBed } from '@angular/core/testing';

import { UserCreateService } from './user-create.service';

describe('UserCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCreateService = TestBed.get(UserCreateService);
    expect(service).toBeTruthy();
  });
});
