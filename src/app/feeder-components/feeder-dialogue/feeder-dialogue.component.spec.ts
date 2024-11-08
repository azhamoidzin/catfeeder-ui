import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDialogueComponent } from './feeder-dialogue.component';

describe('FeederDialogueComponent', () => {
  let component: FeederDialogueComponent;
  let fixture: ComponentFixture<FeederDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeederDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
