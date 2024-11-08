import { Component, Injectable } from '@angular/core';
import {CommunicatorService, Feeder} from '../communicator.service';
import {BehaviorSubject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeederDialogueComponent} from '../feeder-components/feeder-dialogue/feeder-dialogue.component';

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
    let dialogRef = this.dialog.open(FeederDialogueComponent, dialogConfig);
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
    let dialogRef = this.dialog.open(FeederDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.successData$.next(true);
      }
    })
  }
}
