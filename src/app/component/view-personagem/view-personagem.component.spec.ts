import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonagemComponent } from './view-personagem.component';

describe('ViewPersonagemComponent', () => {
  let component: ViewPersonagemComponent;
  let fixture: ComponentFixture<ViewPersonagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPersonagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPersonagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
