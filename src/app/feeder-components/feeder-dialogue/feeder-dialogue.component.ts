import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService, FeederBase} from '../../communicator.service';

@Component({
  selector: 'app-feeder-dialogue',
  templateUrl: './feeder-dialogue.component.html',
  styleUrl: './feeder-dialogue.component.scss'
})
export class FeederDialogueComponent {

  feeder = {
    name: '',
    tags: '',
    status: '',
    schedule: '',
    meal: '',
  };
  errorMsg: string = '';

  constructor(
    private dialogRef: MatDialogRef<FeederDialogueComponent>,
    public communicatorService: CommunicatorService,
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getItemsFromString(target: string) {
    return target.split(/,\s*/);
  }

  validateName() {
    if (!this.feeder.name) {
      this.errorMsg = 'Name must not be empty';
      return false;
    } else {
      return true;
    }
  }

  validateMeal(): boolean {
    const integerPattern = /^[1-9]\d*$/;
    if (!integerPattern.test(this.feeder.meal)) {
      this.errorMsg = 'Meal must be positive integer greater than zero';
      return false;
    } else {
      return true;
    }
  }

  validateStatus(): boolean {
    const floatPattern = /^(0(\.\d+)?|1(\.0+)?)$/;
    return floatPattern.test(this.feeder.status);
  }

  validateSchedule(): boolean {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const timesArray = this.getItemsFromString(this.feeder.schedule);
    if (!timesArray.every(time => timePattern.test(time)) || !this.feeder.schedule) {
      this.errorMsg = 'Schedule must be valid times HH:MM divided by comma'
      return false;
    } else {
      return true;
    }
  }

  validateTags(): boolean {
    const lettersPattern = /^([a-zA-Z]+)(,\s*[a-zA-Z]+)*$/;
    if (this.feeder.tags && !lettersPattern.test(this.feeder.tags)) {
      this.errorMsg = 'Tags must be words from alphabetical letters divided by comma';
      return false;
    } else {
      return true;
    }
  }

  validateFeeder() {
    return this.validateName() && this.validateSchedule() && this.validateMeal() && this.validateTags();
  }

  newFeeder() {
    const validFeeder = this.validateFeeder();
    if (!validFeeder) {
      return;
    }
    this.errorMsg = '';
    const feeder: FeederBase = {
      name: this.feeder.name,
      tags: this.getItemsFromString(this.feeder.tags),
      status: 0,
      schedule: this.getItemsFromString(this.feeder.schedule),
      meal: Number(this.feeder.meal),
    };
    this.communicatorService.newFeeder(feeder).subscribe((response) => {
      console.log(response);
      this.dialogRef.close(true);
    })
  }
}
