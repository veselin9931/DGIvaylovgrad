import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutParentComponent } from './about-parent.component';

describe('AboutParentComponent', () => {
  let component: AboutParentComponent;
  let fixture: ComponentFixture<AboutParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
