import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService, FamilyMember } from '../communicator.service';
import { MatDialog } from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {User} from '../schemas';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrl: './family-page.component.scss'
})
export class FamilyPageComponent {
  constructor(
    private communicatorService: CommunicatorService,
    private dialog: MatDialog,) {
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

  }
}
