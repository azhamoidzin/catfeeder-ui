import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})
export class RegistrationDialogComponent {
  title: string = 'Add new family member';
  buttonTitle: string = 'Add';

  inputData = {
    password: '',
    passwordRepeat: '',
  };
  errorMsg: string = '';

  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
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
