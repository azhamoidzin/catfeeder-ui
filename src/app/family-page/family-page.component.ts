import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService, FamilyMember } from '../communicator.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {Log, User} from '../schemas';
import {ActivatedRoute, Router} from '@angular/router';
import {LogsDialogComponent} from "../logs-dialog/logs-dialog.component";

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrl: './family-page.component.scss'
})
export class FamilyPageComponent {
  constructor(
    private communicatorService: CommunicatorService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,) {
  }
  displayedColumns: string[] = ['id', 'name', 'registration'];
  familyName: string = '';
  members: Array<FamilyMember> = [];
  adminId: number = -1;
  myself: User;

  ngOnInit() {
    this.communicatorService.myFamily().subscribe((response) => {
      this.familyName = response.name;
      this.members = response.members;
      this.adminId = response.admin;
    });
    this.communicatorService.myProfile().subscribe((response) => {
      this.myself = response;
      if (this.myself.family_admin) {
        this.displayedColumns.push('logIcon');
      }
    });
  }

  addMember() {
    let dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

  memberClick(row: FamilyMember) {
    if (!this.myself.family_admin || row.id == this.myself.id) {
      return;
    }
    this.router.navigate(['profile', row.id]);
  }

  logsClick(event: MouseEvent, row: FamilyMember) {
    event.stopPropagation();
    this.communicatorService.getLogs({ user_id: row.id }).subscribe((response: Array<Log>) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'custom-dialog-container';
      dialogConfig.data = response;
      let dialogRef = this.dialog.open(LogsDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      })
    })
  }
}
