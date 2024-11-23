import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-activation-dialog',
  templateUrl: './activation-dialog.component.html',
  styleUrl: './activation-dialog.component.scss'
})
export class ActivationDialogComponent {
  title: string = 'Create password to activate account';
  buttonTitle: string = 'Activate';

  inputData = {
    password: '',
    passwordRepeat: '',
  };
  errorMsg: string = '';

  constructor(
    private dialogRef: MatDialogRef<ActivationDialogComponent>,
    public communicatorService: CommunicatorService,
  ) { }

  ngOnInit() {
  }

  validatePasswords() {
    if (!this.inputData.password) {
      this.errorMsg = 'Password must not be empty';
      return false;
    } else {
      return true;
    }
  }

  passwordsMatch() {
    if (this.inputData.password == this.inputData.passwordRepeat) {
      return true;
    } else {
      this.errorMsg = 'Password must match';
      return false;
    }
  }

  validateInput() {
    return this.validatePasswords() && this.passwordsMatch();
  }

  click() {
    const validMember = this.validateInput();
    if (!validMember) {
      return;
    }
    this.errorMsg = '';
    const registrationData = {
      password: this.inputData.password,
    };
    this.dialogRef.close(this.inputData.password);
  }
}
