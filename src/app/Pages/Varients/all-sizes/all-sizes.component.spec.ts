import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSizesComponent } from './all-sizes.component';

describe('AllSizesComponent', () => {
  let component: AllSizesComponent;
  let fixture: ComponentFixture<AllSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
