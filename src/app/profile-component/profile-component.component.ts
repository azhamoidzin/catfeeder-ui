import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService, Feeder } from '../communicator.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeederDialogueComponent } from '../feeder-components/feeder-dialogue/feeder-dialogue.component';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrl: './profile-component.component.scss'
})
export class ProfileComponentComponent {
  constructor(
    public authService: AuthService,
    private communicatorService: CommunicatorService,
    private dialog: MatDialog) {
  }

  username: string = "";
  fullName: string = "";
  email: string = "";
  feeders: Array<Feeder> = [];


  ngOnInit() {
    this.communicatorService.myProfile().subscribe((response) => {
      this.username = response.username;
      this.fullName = response.full_name;
      this.email = response.email;
    })
    this.communicatorService.myFeeders().subscribe((response) => {
      response.forEach(feeder => {
        this.feeders.push(feeder);
      })
    })
  }

  addNewFeeder() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';  // Set width to make sure it's centered
    dialogConfig.position = {
      top: '50%',
      left: '50%'
    };
    dialogConfig.panelClass = 'custom-dialog-container';
    let dialogRef = this.dialog.open(FeederDialogueComponent, dialogConfig);
  }
}
