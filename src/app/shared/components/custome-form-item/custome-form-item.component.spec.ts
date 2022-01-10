import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeFormItemComponent } from './custome-form-item.component';

describe('CustomeFormItemComponent', () => {
  let component: CustomeFormItemComponent;
  let fixture: ComponentFixture<CustomeFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
