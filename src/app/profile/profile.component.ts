import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService } from '../communicator.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeederDialogComponent } from '../feeder-components/feeder-edit-dialog/feeder-dialog.component';
import {FeederService} from '../services/feeder.service';
import {Subject, takeUntil} from 'rxjs';
import { Feeder } from '../schemas';
import {ActivationDialogComponent} from '../activation-dialog/activation-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

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
    private feederService: FeederService,
    private route: ActivatedRoute,
    private router: Router,) {
  }
  destroy$ = new Subject<void>();

  id: number | null = null;
  name: string = "";
  email: string = "";
  familyAdmin: boolean = false;
  feeders: Array<Feeder> = [];

  updateFeeders() {
    const newFeeders: Array<Feeder> = [];
    this.communicatorService.myFeeders(this.id).subscribe((response) => {
      response.forEach(feeder => {
        newFeeders.push(feeder);
      })
      this.feeders = newFeeders;
    })
  }

  ngOnInit() {
    this.feederService.successData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        v && this.updateFeeders();
      });
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('user_id'));
      if (userId) {
        this.communicatorService.getProfile(userId).subscribe((response) => {
          this.id = response.id;
          this.name = response.name;
          this.email = response.email;
          this.familyAdmin = response.family_admin;
          this.updateFeeders();
        });
      } else {
        this.communicatorService.myProfile().subscribe((response) => {
          this.id = response.id;
          this.name = response.name;
          this.email = response.email;
          this.familyAdmin = response.family_admin;
          this.updateFeeders();
        });
      }
    });

    this.communicatorService.familyStatus().subscribe((response) => {
      console.log(response);
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }
  addNewFeeder() {
    this.feederService.addFeeder(this.id, this.name);
  }
}
