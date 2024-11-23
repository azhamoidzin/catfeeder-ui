import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})
export class RegistrationDialogComponent {

  title: string = 'Register new account and family';
  buttonTitle: string = 'Add';

  inputData = {
    name: '',
    email: '',
    familyName: '',
  };
  errorMsg: string = '';

  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    public communicatorService: CommunicatorService,
  ) { }

  ngOnInit() {
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

  validateFamilyName() {
    if (!this.inputData.familyName) {
      this.errorMsg = 'Family name must not be empty';
      return false;
    } else {
      return true;
    }
  }

  validateEmail(): boolean {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(this.inputData.email)) {
      this.errorMsg = 'Invalid email';
      return false;
    } else {
      return true;
    }
  }

  validateInput() {
    return this.validateName() && this.validateEmail() && this.validateFamilyName();
  }

  click() {
    const validMember = this.validateInput();
    if (!validMember) {
      return;
    }
    this.errorMsg = '';
    const member = {
      name: this.inputData.name,
      email: this.inputData.email,
      family_name: this.inputData.familyName,
    };

    this.communicatorService.register(member).subscribe((response) => {
      if (response) {
        this.closeDialog(true);
      } else {
        this.closeDialog(false);
      }
    })
  }
}
