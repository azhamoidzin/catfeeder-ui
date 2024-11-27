import {Component, Input} from '@angular/core';
import { CommunicatorService } from '../../communicator.service';
import { AuthService } from '../../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FeederService} from '../../services/feeder.service';
import {Feeder} from '../../schemas';

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

  public getBowlImage(): string {
    const basePath = 'assets/images/bowls';
    const mealPercentage = this.feeder.current_meal / this.feeder.max_meal * 100;
    if (mealPercentage >= 90) {
      return `${basePath}/filled-bowl.png`;
    } else if (mealPercentage >= 40 ) {
      return `${basePath}/semi-filled-bowl.png`;
    } else if (mealPercentage >= 10) {
      return `${basePath}/almost-empty-bowl.png`;
    } else {
      return `${basePath}/empty-bowl.png`;
    }
  }

  public findNext(): string | null { // TODO: next time strange
    // Convert the current time to minutes
    const times = this.feeder.schedule || [];
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
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
    this.feederService.activateFeeder(this.feeder).subscribe((response) => {
      if (response) {
        let message: string;
        if (response.fed) {
          message = 'Successfully fed '+ this.feeder.name + ' by ' + response.amount;
          this.feederService.successData$.next(true);
        } else {
          message = 'Failed to feed ' + this.feeder.name;
        }
        let snackBarRef = this.snackBar.open(
          message, '', {
            duration: 5 * 1000
          }
        );
      }
    })

  }

  refillClick() {
    this.feederService.refillFeeder(this.feeder).subscribe((response) => {
      let message;
      if (response) {
        message = 'Successfully refilled '+ this.feeder.name;
        this.feederService.successData$.next(true);
      } else {
        message = 'Failed to refill ' + this.feeder.name;
      }
      let snackBarRef = this.snackBar.open(
        message, '', {
          duration: 5 * 1000
        }
      );
    })

  }

  logsClick() {
    this.feederService.getLogs(this.feeder);
  }

  downloadScheduleClick() {
    this.communicatorService.downloadScheduleById(this.feeder).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.feeder.name + '.catschedule';  // File name for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
