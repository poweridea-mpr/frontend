import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Risk, User, Project } from '../../models';

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
    {name: 'Level'},
    {name: 'Duration'},
    {name: 'Value'},
    {name: 'Actions'}
  ];

  constructor(public af: AngularFire, public dialog: MdDialog, public route: ActivatedRoute, public snackBar: MdSnackBar) {
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

  openEditRiskDialog(risk: Risk) {
    const dialogRef = this.dialog.open(AddRiskDialogComponent);
    dialogRef.afterClosed().subscribe(newRisk => {
      if (!newRisk) return;

      newRisk = Object.keys(newRisk).filter(key => newRisk[key] !== risk[key]).reduce((acc, key) => ({...acc, [key]: newRisk[key]}), {}); // new
      delete newRisk.$$index;
      // update the object
      if (Object.keys(newRisk).length > 0) {
        this.risks.update(risk.$key, newRisk);
      }
    });
    (<any>dialogRef.componentInstance).data = risk;
  }

  deleteRisk(risk: Risk) {
    const bar = this.snackBar.open('Undo the deletion', 'Undo', {
      duration: 10000
    });

    bar.onAction().subscribe(() => {
      let proj = Object.assign({}, risk);
      delete proj.$$index;
      this.risks.push(proj);
    });

    this.risks.remove(risk.$key);
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

  // all users for owner autocomplete
  users: FirebaseListObservable<User[]>;
  // all projects for validation
  projects: FirebaseListObservable<Project[]>;

  filteredUsers: any;
  filteredProjects: any;

  data: Risk;

  constructor(public af: AngularFire, public dialogRef: MdDialogRef<AddRiskDialogComponent>) {
    this.ownerStateCtrl = new FormControl();
    this.projectStateCtrl = new FormControl();
    this.levelStateCtrl = new FormControl();

    this.users = af.database.list('/users');
    this.projects = af.database.list('/projects');
  }

  onCreateRiskButtonClick(name, project, owner, description, level, from, to, value) {
    this.dialogRef.close(<Risk>{
      name: name,
      project: project,
      owner: owner,
      description: description,
      level: level,
      from: from,
      to: to,
      value: value
    });
  }
}
