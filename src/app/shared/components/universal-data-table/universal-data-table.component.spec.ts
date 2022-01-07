import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalDataTableComponent } from './universal-data-table.component';

describe('UniversalDataTableComponent', () => {
  let component: UniversalDataTableComponent;
  let fixture: ComponentFixture<UniversalDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversalDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
