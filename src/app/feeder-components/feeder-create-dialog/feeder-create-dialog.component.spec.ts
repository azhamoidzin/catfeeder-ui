import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederCreateDialogComponent } from './feeder-create-dialog.component';

describe('FeederCreateDialogComponent', () => {
  let component: FeederCreateDialogComponent;
  let fixture: ComponentFixture<FeederCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeederCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
