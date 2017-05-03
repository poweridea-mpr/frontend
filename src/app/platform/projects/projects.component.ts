import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';
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

  columns = [
    {name: 'ID'},
    {name: 'Name'},
    {name: 'Owner'},
    {name: 'Description'},
    {name: 'Goal'},
  ];

  constructor(public af: AngularFire, public dialog: MdDialog, public router: Router) {
    this.projects = this.af.database.list('/projects');
  }

  ngOnInit() {
  }

  openAddProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      // create new project
      this.projects.push(result);
    });
  }

  onProjectSelect(event) {
    this.router.navigate([`/platform/risks/${event.selected[0].id}`]);
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

  onCreateProjectButtonClick(name, id, owner, description, goal) {
    this.dialogRef.close(<Project>{
      id: id,
      name: name,
      owner: owner,
      description: description,
      goal: goal,
    });
  }

  createProjectID(name: string): string {
    return name.replace(/\s/g, '').toUpperCase().slice(0, 7);
  }
}
