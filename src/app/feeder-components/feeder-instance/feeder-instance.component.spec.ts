import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederInstanceComponent } from './feeder-instance.component';

describe('FeederInstanceComponent', () => {
  let component: FeederInstanceComponent;
  let fixture: ComponentFixture<FeederInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeederInstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
