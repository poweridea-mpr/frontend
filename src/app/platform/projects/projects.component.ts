import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Project, User } from '../../models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: FirebaseListObservable<Project[]>;
  data: Project[] = [];
  filterVal = '';

  columns = [
    {name: 'ID'},
    {name: 'Name'},
    {name: 'Owner'},
    {name: 'Description'},
    {name: 'Goal'},
    {name: 'From'},
    {name: 'To'},
    {name: 'Active'},
    {name: 'Actions'}
  ];

  constructor(public af: AngularFire, public dialog: MdDialog, public router: Router, public snackBar: MdSnackBar) {
    this.projects = this.af.database.list('/projects');
    this.projects.subscribe(data => {
      this.data = data
    });
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

  openEditProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);
    dialogRef.afterClosed().subscribe(newProject => {
      if (!newProject) return;

      newProject = Object.keys(newProject).filter(key => newProject[key] !== project[key]).reduce((acc, key) => ({...acc, [key]: newProject[key]}), {}); // new
      delete newProject.$$index;
      // update the object
      if (Object.keys(newProject).length > 0) {
        this.projects.update(project.$key, newProject);
      }
    });
    (<any>dialogRef.componentInstance).data = project;
  }

  onProjectSelect(event) {
    this.router.navigate([`/platform/risks/`, event]);
  }

  deleteProject(project: Project) {
    const bar = this.snackBar.open('Undo the deletion', 'Undo', {
      duration: 10000
    });

    bar.onAction().subscribe(() => {
      let proj = Object.assign({}, project);
      delete proj.$$index;
      this.projects.push(proj);
    });

    this.projects.remove(project.$key);
  }

  get filteredData() {
    return this.data.filter(item => (
      item.description.startsWith(this.filterVal) ||
      item.goal.startsWith(this.filterVal) ||
      item.id.startsWith(this.filterVal) ||
      item.name.startsWith(this.filterVal) ||
      item.owner.startsWith(this.filterVal)
    ));
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

  data: Project;

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

  onCreateProjectButtonClick(form, name, id, owner, description, goal, from, to) {
    this.dialogRef.close(<Project>{
      id: id,
      name: name,
      owner: owner,
      description: description,
      goal: goal,
      from: from,
      to: to,
      active: true
    });
  }

  createProjectID(name: string): string {
    return name.replace(/\s/g, '').toUpperCase().slice(0, 7);
  }
}
