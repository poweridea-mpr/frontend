import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.scss']
})
export class RisksComponent implements OnInit {

  constructor(public af: AngularFire, public dialog: MdDialog) { }

  ngOnInit() {
  }

  openAddRiskDialog() {
    const dialogRef = this.dialog.open(AddRiskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // create new risk
    });
  }

}

@Component({
  selector: 'app-risks-add-risk-dialog',
  templateUrl: './add-risk.component.html',
  styleUrls: ['./add-risk.component.scss']
})
export class AddRiskDialogComponent {
  constructor(public af: AngularFire, public dialogRef: MdDialogRef<AddRiskDialogComponent>) {
  }
}