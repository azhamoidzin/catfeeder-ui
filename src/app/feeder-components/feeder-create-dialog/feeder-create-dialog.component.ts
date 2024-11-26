import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService} from '../../communicator.service';
import {AlertService} from '../../services/alert.service';
import {FeederCreate} from '../../schemas';

interface UserData {
  userId: number;
  userName: string;
}

@Component({
  selector: 'app-feeder-create-dialog',
  templateUrl: './feeder-create-dialog.component.html',
  styleUrl: './feeder-create-dialog.component.scss'
})
export class FeederCreateDialogComponent {
  title: string = 'Register new feeder';
  buttonTitle: string = 'Register';

  inputData = {
    name: '',
    max_meal: '',
    type: '',
  };
  errorMsg: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private dialogRef: MatDialogRef<FeederCreateDialogComponent>,
    public communicatorService: CommunicatorService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.title = this.title + ' for ' + this.data.userName;
  }

  closeDialog(status: boolean): void {
    this.dialogRef.close(status);
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
    if (!integerPattern.test(this.inputData.max_meal)) {
      this.errorMsg = 'Meal must be positive integer greater than zero';
      return false;
    } else {
      return true;
    }
  }

  validateType() {
    if (!['1', '0'].includes(this.inputData.type)) {
      this.errorMsg = 'Type must be 0 or 1';
      return false;
    } else {
      return true;
    }
  }

  validateFeeder() {
    return this.validateName() && this.validateMeal() && this.validateType();
  }

  click() {
    const validFeeder = this.validateFeeder();
    if (!validFeeder) {
      return;
    }
    this.errorMsg = '';
    const feeder: FeederCreate = {
      name: this.inputData.name,
      max_meal: Number(this.inputData.max_meal),
      type: Number(this.inputData.type),
      user_id: this.data.userId,
    };
    this.communicatorService.newFeeder(feeder).subscribe((response) => {
      if (response) {
        this.closeDialog(true);
      } else {
        this.closeDialog(false);
      }
    })
  }
}
