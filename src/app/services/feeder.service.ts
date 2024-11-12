import { Component, Injectable } from '@angular/core';
import {CommunicatorService, Feeder} from '../communicator.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeederDialogComponent} from '../feeder-components/feeder-dialog/feeder-dialog.component';

@Injectable({providedIn: 'root'})
export class FeederService {

  constructor(
    private communicatorService: CommunicatorService,
    private dialog: MatDialog,
    ) {
  }

  successData$ = new BehaviorSubject<boolean>(false);

  addFeeder(): void {
    this.successData$.next(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    let dialogRef = this.dialog.open(FeederDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.successData$.next(true);
      }
    })
  }

  editFeeder(feeder: Feeder): void {
    this.successData$.next(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = feeder;
    let dialogRef = this.dialog.open(FeederDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.successData$.next(true);
      }
    })
  }

  getLogs(feeder: Feeder) {
    this.communicatorService.getFeederLogs(feeder.feeder_id).subscribe((response: any) => {
      console.log(response);
    })
  }
}
