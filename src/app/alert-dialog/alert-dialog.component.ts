import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export enum AlertDialogType { success, error, warning, info }
export interface AlertDialogData {
  type: AlertDialogType;
  title: string;
  text: string;
  buttonText: string;
  secondButtonText?: string;
}
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  iconPath: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {
  }

  get getImage() {
    const imageMap: { [key in AlertDialogType]: string } = {
      [AlertDialogType.success]: 'assets/images/yes.png',
      [AlertDialogType.error]: 'assets/images/error.png',
      [AlertDialogType.warning]: 'assets/images/warning.png',
      [AlertDialogType.info]: 'assets/images/info.png',
    }
    return imageMap[this.data.type] || 'assets/images/kitty.png';
  }

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }
}
