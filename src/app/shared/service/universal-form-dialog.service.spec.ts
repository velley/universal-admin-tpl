import { TestBed } from '@angular/core/testing';
import { UniversalFormModalService } from './universal-form-dialog.service';

describe('UniversalFormDialogService', () => {
  let service: UniversalFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversalFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
