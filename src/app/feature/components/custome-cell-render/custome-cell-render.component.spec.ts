import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeCellRenderComponent } from './custome-cell-render.component';

describe('CustomeCellRenderComponent', () => {
  let component: CustomeCellRenderComponent;
  let fixture: ComponentFixture<CustomeCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeCellRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
