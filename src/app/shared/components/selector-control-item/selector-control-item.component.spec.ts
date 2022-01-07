import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorControlItemComponent } from './selector-control-item.component';

describe('SelectorControlItemComponent', () => {
  let component: SelectorControlItemComponent;
  let fixture: ComponentFixture<SelectorControlItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorControlItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
