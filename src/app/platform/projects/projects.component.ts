import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openAddProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

@Component({
  selector: 'app-projects-add-project-dialog',
  template: 'Add project dialog',
  styles: ['']
})
export class AddProjectDialogComponent {
  constructor(public dialogRef: MdDialogRef<AddProjectDialogComponent>) {}
}
