import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevDashboardComponent } from './rev-dashboard.component';

describe('RevDashboardComponent', () => {
  let component: RevDashboardComponent;
  let fixture: ComponentFixture<RevDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
