import { TestBed } from '@angular/core/testing';

import { PreDefinedFormItem } from './pre-defined-form-field.service';

describe('PreDefinedFormItem', () => {
  let service: PreDefinedFormItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreDefinedFormItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
