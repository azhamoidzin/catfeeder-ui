import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent, AlertDialogData, AlertDialogType} from '../alert-dialog/alert-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  open(data: AlertDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data,
      disableClose: true
    });
    return dialogRef.afterClosed();
  }

  generateAlertDialogData(type: AlertDialogType, title: string, text: string, buttonText: string, secondButtonText?: string) {
    return {
      type: type, title: title, text: text, buttonText: buttonText, secondButtonText: secondButtonText
    }
  }

  info(title: string, text: string, buttonText: string, secondButtonText?: string) {
    return this.open(this.generateAlertDialogData(AlertDialogType.info, title, text, buttonText, secondButtonText));
  }

  warning(title: string, text: string, buttonText: string, secondButtonText?: string) {
    return this.open(this.generateAlertDialogData(AlertDialogType.warning, title, text, buttonText, secondButtonText));
  }

  error(title: string, text: string, buttonText: string, secondButtonText?: string) {
    return this.open(this.generateAlertDialogData(AlertDialogType.error, title, text, buttonText, secondButtonText));
  }

  success(title: string, text: string, buttonText: string, secondButtonText?: string) {
    return this.open(this.generateAlertDialogData(AlertDialogType.success, title, text, buttonText, secondButtonText));
  }
}
