import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService, Feeder, FeederBase} from '../../communicator.service';

@Component({
  selector: 'app-feeder-dialog',
  templateUrl: './feeder-dialog.component.html',
  styleUrl: './feeder-dialog.component.scss'
})
export class FeederDialogComponent {
  @ViewChild('scheduleInput', { static: true }) scheduleInput: ElementRef;

  title: string = 'Add new feeder';
  buttonTitle: string = 'Add';

  inputData = {
    name: '',
    tags: '',
    status: '',
    schedule: '',
    meal: '',
  };
  errorMsg: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public feederInstance: Feeder,
    private dialogRef: MatDialogRef<FeederDialogComponent>,
    public communicatorService: CommunicatorService,
  ) { }

  ngOnInit() {
    console.log(this.feederInstance);
    if (this.feederInstance) {
      this.title = 'Edit feeder ' + this.feederInstance.feeder_id;
      this.buttonTitle = 'Save changes';
      this.inputData = {
        name: this.feederInstance.name,
        tags: this.feederInstance.tags.join(', '),
        status: String(this.feederInstance.status),
        schedule: this.feederInstance.schedule.join(', '),
        meal: String(this.feederInstance.meal),
      };
    }
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
    if (!integerPattern.test(this.inputData.meal)) {
      this.errorMsg = 'Meal must be positive integer greater than zero';
      return false;
    } else {
      return true;
    }
  }

  validateStatus(): boolean {
    const floatPattern = /^(0(\.\d+)?|1(\.0+)?)$/;
    return floatPattern.test(this.inputData.status);
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
    const feeder: Feeder = {
      name: this.inputData.name,
      tags: this.getItemsFromString(this.inputData.tags),
      status: 0,
      schedule: this.getItemsFromString(this.inputData.schedule),
      meal: Number(this.inputData.meal),
      feeder_id: this.feederInstance ? this.feederInstance.feeder_id : -1,
    };
    if (!this.feederInstance) {
      this.communicatorService.newFeeder(feeder).subscribe((response) => {
        if (response) {
          this.closeDialog(true);
        } else {
          this.closeDialog(false);
        }
      })
    } else {
      this.communicatorService.editFeederById(feeder).subscribe((response) => {
        if (response) {
          this.closeDialog(true);
        } else {
          this.closeDialog(false);
        }
      })
    }
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
