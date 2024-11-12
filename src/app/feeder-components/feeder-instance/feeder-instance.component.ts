import {Component, Input} from '@angular/core';
import { CommunicatorService, Feeder } from '../../communicator.service';
import { AuthService } from '../../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FeederService} from '../../services/feeder.service';

@Component({
  selector: 'app-feeder-instance',
  templateUrl: './feeder-instance.component.html',
  styleUrl: './feeder-instance.component.scss'
})
export class FeederInstanceComponent {
  @Input({ required: true }) feeder: Feeder;

  constructor(
    public authService: AuthService,
    private communicatorService: CommunicatorService,
    private feederService: FeederService,
    public snackBar: MatSnackBar,
    ) {
  }



  public findNext(): string | null { // TODO: next time strange
    // Convert the current time to minutes
    const times = this.feeder.schedule;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    // Convert each time in the array to minutes and filter for times in the future
    const futureTimes = times
      .map(time => {
        const [hour, minute] = time.split(":").map(Number);
        return { time, totalMinutes: hour * 60 + minute };
      })
      .filter(t => t.totalMinutes > currentTotalMinutes)
      .sort((a, b) => a.totalMinutes - b.totalMinutes);

    // Return the next time or null if there's no future time in the array
    return futureTimes.length > 0 ? futureTimes[0].time : null;
  }

  editClick() {
    this.feederService.editFeeder(this.feeder);
  }

  feedClick() {
    let snackBarRef = this.snackBar.open(
      'Successfully fed '+ this.feeder.name + ' by ' + this.feeder.meal, '', {
        duration: 5 * 1000
      }
    );
  }

  logsClick() {
    this.feederService.getLogs(this.feeder);
  }

  downloadScheduleClick() {
    this.communicatorService.downloadScheduleById(this.feeder).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.catschedule';  // File name for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
