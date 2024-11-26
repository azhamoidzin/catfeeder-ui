import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicatorService } from '../communicator.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private communicatorService: CommunicatorService,
    private dialog: MatDialog) {
  }

  id: number | null = null;
  name: string = "";
  email: string = "";

  total_users: number;
  total_feeders: number;
  total_poured: number;
  current_time: string;

  ngOnInit() {
    this.communicatorService.myProfile().subscribe((response) => {
      this.id = response.id;
      this.name = response.name;
      this.email = response.email;
    });
    this.communicatorService.familyStatus().subscribe((response) => {
      if (response) {
        this.total_feeders = response.total_feeders;
        this.total_users = response.total_users;
        this.total_poured = response.total_poured;
        this.current_time = response.current_time;
      }
    });

  }
}
