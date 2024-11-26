import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommunicatorService} from '../communicator.service';
import {AlertService} from '../services/alert.service';
import {Log} from '../schemas';

@Component({
  selector: 'app-logs-dialog',
  templateUrl: './logs-dialog.component.html',
  styleUrl: './logs-dialog.component.scss'
})
export class LogsDialogComponent {
  title: string = 'Logs';
  buttonTitle: string = 'Export logs';

  inputData = {
    name: '',
    max_meal: '',
    type: '',
  };
  errorMsg: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<Log>,
    private dialogRef: MatDialogRef<LogsDialogComponent>,
    public communicatorService: CommunicatorService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  exportLogs() {

  }
}
