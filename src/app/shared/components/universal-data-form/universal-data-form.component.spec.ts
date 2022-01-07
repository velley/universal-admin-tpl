import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalDataFormComponent } from './universal-data-form.component';

describe('UniversalDataFormComponent', () => {
  let component: UniversalDataFormComponent;
  let fixture: ComponentFixture<UniversalDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversalDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
