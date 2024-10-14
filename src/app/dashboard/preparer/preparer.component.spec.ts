import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparerComponent } from './preparer.component';

describe('PreparerComponent', () => {
  let component: PreparerComponent;
  let fixture: ComponentFixture<PreparerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
