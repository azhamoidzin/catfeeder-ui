import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService, Feeder} from '../communicator.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

  title: string = 'Add new family member';
  buttonTitle: string = 'Add';

  inputData = {
    name: '',
    email: '',
  };
  errorMsg: string = '';

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
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
    return this.validateName() && this.validateEmail();
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
    };

    this.communicatorService.addFamilyMember(member).subscribe((response) => {
      if (response) {
        this.closeDialog(true);
      } else {
        this.closeDialog(false);
      }
    })
  }
}
