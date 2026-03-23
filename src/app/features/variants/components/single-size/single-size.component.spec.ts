import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSizeComponent } from './single-size.component';

describe('SingleSizeComponent', () => {
  let component: SingleSizeComponent;
  let fixture: ComponentFixture<SingleSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
