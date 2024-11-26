import { Component, Injectable } from '@angular/core';
import {CommunicatorService} from '../communicator.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeederDialogComponent} from '../feeder-components/feeder-edit-dialog/feeder-dialog.component';
import {FeederCreateDialogComponent} from '../feeder-components/feeder-create-dialog/feeder-create-dialog.component';
import {Feeder} from '../schemas';

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
    let dialogRef = this.dialog.open(FeederCreateDialogComponent, dialogConfig);
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

  activateFeeder(feeder: Feeder) {
    return this.communicatorService.instantFeed(feeder.id);
  }

  getLogs(feeder: Feeder) {
    this.communicatorService.getLogs({ feeder_id: feeder.id }).subscribe((response: any) => {
      console.log(response);
    })
  }
}
