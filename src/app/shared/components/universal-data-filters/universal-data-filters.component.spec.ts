import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalDataFiltersComponent } from './universal-data-filters.component';

describe('UniversalDataFiltersComponent', () => {
  let component: UniversalDataFiltersComponent;
  let fixture: ComponentFixture<UniversalDataFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversalDataFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalDataFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
