import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService, FamilyMember } from '../communicator.service';
import { MatDialog } from '@angular/material/dialog';
import { FeederService } from '../services/feeder.service';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrl: './family-page.component.scss'
})
export class FamilyPageComponent {
  constructor(
    public authService: AuthService,
    private communicatorService: CommunicatorService) {
  }

  familyName: string = '';
  members: Array<FamilyMember> = [];
  adminId: number = -1;

  ngOnInit() {
    this.communicatorService.myFamily().subscribe((response) => {
      this.familyName = response.name;
      this.members = response.members;
      this.adminId = response.admin;
    });
  }
}
