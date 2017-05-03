import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../../models';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.scss']
})
export class RisksComponent implements OnInit {

  risks: FirebaseListObservable<Risk[]>;

  columns = [
    {name: 'Name'},
    {name: 'Project'},
    {name: 'Owner'},
    {name: 'Description'},
    {name: 'Level'}
  ];

  constructor(public af: AngularFire, public dialog: MdDialog, public route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.risks = af.database.list('/risks', {
        query: {
          orderByChild: 'project',
          equalTo: params.project? params.project : undefined,
        }
      });
    });
  }

  ngOnInit() {
  }

  openAddRiskDialog() {
    const dialogRef = this.dialog.open(AddRiskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.risks.push(result);
    });
  }

}

@Component({
  selector: 'app-risks-add-risk-dialog',
  templateUrl: './add-risk.component.html',
  styleUrls: ['./add-risk.component.scss']
})
export class AddRiskDialogComponent {
  ownerStateCtrl: FormControl;
  projectStateCtrl: FormControl;
  levelStateCtrl: FormControl;

  constructor(public af: AngularFire, public dialogRef: MdDialogRef<AddRiskDialogComponent>) {
    this.ownerStateCtrl = new FormControl();
    this.projectStateCtrl = new FormControl();
    this.levelStateCtrl = new FormControl();
  }

  onCreateRiskButtonClick(name, project, owner, description, level) {
    this.dialogRef.close(<Risk>{
      name: name,
      project: project,
      owner: owner,
      description: description,
      level: level,
    });
  }
}