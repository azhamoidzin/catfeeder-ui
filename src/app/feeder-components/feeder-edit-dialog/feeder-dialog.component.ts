import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService, FeederBase} from '../../communicator.service';
import {AlertService} from '../../services/alert.service';
import {Feeder, FeederUpdate} from '../../schemas';

@Component({
  selector: 'app-feeder-edit-dialog',
  templateUrl: './feeder-dialog.component.html',
  styleUrl: './feeder-dialog.component.scss'
})
export class FeederDialogComponent {
  @ViewChild('scheduleInput', { static: true }) scheduleInput: ElementRef;

  title: string = '';
  buttonTitle: string = '';

  inputData = {
    name: '',
    tags: '',
    schedule: '',
    portion_meal: '',
  };
  errorMsg: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public feederInstance: Feeder,
    private dialogRef: MatDialogRef<FeederDialogComponent>,
    public communicatorService: CommunicatorService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.title = 'Edit feeder';
    this.buttonTitle = 'Save changes';
    this.inputData = {
      name: this.feederInstance.name,
      tags: this.feederInstance.tags.join(', '),
      schedule: this.feederInstance.schedule.join(', '),
      portion_meal: String(this.feederInstance.portion_meal | 0),
    };
  }
  closeDialog(status: boolean): void {
    this.dialogRef.close(status);
  }

  getItemsFromString(target: string) {
    return target.split(/,\s*/);
  }

  validateName() {
    if (!this.inputData.name) {
      this.errorMsg = 'Name must not be empty';
      return false;
    } else {
      return true;
    }
  }

  validateMeal(): boolean {
    const integerPattern = /^[1-9]\d*$/;
    if (!integerPattern.test(this.inputData.portion_meal)) {
      this.errorMsg = 'Meal must be positive integer greater than zero';
      return false;
    } else {
      return true;
    }
  }

  validateSchedule(): boolean {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const timesArray = this.getItemsFromString(this.inputData.schedule);
    if (!timesArray.every(time => timePattern.test(time)) || !this.inputData.schedule) {
      this.errorMsg = 'Schedule must be valid times HH:MM divided by comma'
      return false;
    } else {
      return true;
    }
  }

  validateTags(): boolean {
    const lettersPattern = /^([a-zA-Z]+)(,\s*[a-zA-Z]+)*$/;
    if (this.inputData.tags && !lettersPattern.test(this.inputData.tags)) {
      this.errorMsg = 'Tags must be words from alphabetical letters divided by comma';
      return false;
    } else {
      return true;
    }
  }

  validateFeeder() {
    return this.validateName() && this.validateSchedule() && this.validateMeal() && this.validateTags();
  }

  click() {
    const validFeeder = this.validateFeeder();
    if (!validFeeder) {
      return;
    }
    this.errorMsg = '';
    const feeder: FeederUpdate = {
      name: this.inputData.name,
      tags: this.getItemsFromString(this.inputData.tags),
      schedule: this.getItemsFromString(this.inputData.schedule),
      portion_meal: Number(this.inputData.portion_meal),
      current_meal: 0,
    };
    this.communicatorService.editFeederById(this.feederInstance.id, feeder).subscribe((response) => {
      if (response) {
        this.closeDialog(true);
        this.alertService.success('Success!', 'Feeder edited successfully', 'Yaaay!').subscribe((response) => {});
      } else {
        this.closeDialog(false);
      }
    })
  }

  uploadSchedule() {
    this.scheduleInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result;
        if (!content) {
          this.errorMsg = 'Invalid schedule file!';
          return;
        }
        this.inputData.schedule = String(content);
        this.validateSchedule();
      };

      reader.readAsText(file);
    }
  }
}
