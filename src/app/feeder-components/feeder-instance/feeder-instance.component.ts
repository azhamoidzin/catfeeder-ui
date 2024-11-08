import {Component, Input} from '@angular/core';
import { CommunicatorService, Feeder } from '../../communicator.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-feeder-instance',
  templateUrl: './feeder-instance.component.html',
  styleUrl: './feeder-instance.component.scss'
})
export class FeederInstanceComponent {
  @Input({ required: true }) feeder: Feeder;

  constructor(public authService: AuthService, private communicatorService: CommunicatorService) {
  }



  public findNext(): string | null {
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

}
