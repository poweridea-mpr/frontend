import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Project, User } from '../../models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: FirebaseListObservable<Project[]>;

  constructor(public af: AngularFire, public dialog: MdDialog) {
    this.af.database.list('/projects');
  }

  ngOnInit() {
  }

  openAddProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // create new project
      this.projects.push(result);
    });
  }

}

@Component({
  selector: 'app-projects-add-project-dialog',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectDialogComponent {

  // all users for owner autocomplete
  users: FirebaseListObservable<User[]>;
  // all projects for validation
  projects: FirebaseListObservable<Project[]>;

  owners: string[];

  // autocomplete form control
  ownerStateCtrl: FormControl;
  filteredUsers: any;

  constructor(public af: AngularFire, public dialogRef: MdDialogRef<AddProjectDialogComponent>) {
    this.users = af.database.list('/users');
    this.projects = af.database.list('/projects');

    // get only nicknames
    this.users.subscribe((u) => {
      this.owners = u.map(x => x.nickname);
    });

    this.ownerStateCtrl = new FormControl();
    this.filteredUsers = this.ownerStateCtrl.valueChanges
      .startWith(null)
      .map((name) => this.filterOwners(name));
  }

  filterOwners(name) {
    return name ? this.owners.filter((o) => o.indexOf(name) !== -1) : this.owners;
  }

  onCreateProjectButtonClick(name, owner, description, goal) {
    this.dialogRef.close(<Project>{
      name: name,
      owner: owner,
      description: description,
      goal: goal,
    });
  }
}
