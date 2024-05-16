import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEpisodioComponent } from './view-episodio.component';

describe('ViewEpisodioComponent', () => {
  let component: ViewEpisodioComponent;
  let fixture: ComponentFixture<ViewEpisodioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEpisodioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEpisodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
