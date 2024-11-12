import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService, Feeder } from '../communicator.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeederDialogComponent } from '../feeder-components/feeder-dialog/feeder-dialog.component';
import {FeederService} from '../services/feeder.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(
    public authService: AuthService,
    private communicatorService: CommunicatorService,
    private dialog: MatDialog,
    private feederService: FeederService) {
  }
  destroy$ = new Subject<void>();

  username: string = "";
  fullName: string = "";
  email: string = "";
  feeders: Array<Feeder> = [];

  updateFeeders() {
    this.feeders = [];
    this.communicatorService.myFeeders().subscribe((response) => {
      response.forEach(feeder => {
        this.feeders.push(feeder);
      })
    })
  }

  ngOnInit() {
    this.feederService.successData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        v && this.updateFeeders();
      })
    this.communicatorService.myProfile().subscribe((response) => {
      this.username = response.username;
      this.fullName = response.full_name;
      this.email = response.email;
    })
    this.updateFeeders();

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }
  addNewFeeder() {
    this.feederService.addFeeder();
  }
}
