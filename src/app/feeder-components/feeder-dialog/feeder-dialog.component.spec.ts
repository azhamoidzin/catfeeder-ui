import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDialogComponent } from './feeder-dialog.component';

describe('FeederDialogueComponent', () => {
  let component: FeederDialogComponent;
  let fixture: ComponentFixture<FeederDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeederDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
