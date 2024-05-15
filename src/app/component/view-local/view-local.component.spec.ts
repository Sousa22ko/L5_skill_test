import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLocalComponent } from './view-local.component';

describe('ViewLocalComponent', () => {
  let component: ViewLocalComponent;
  let fixture: ComponentFixture<ViewLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
