import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';

import { User } from '../../models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: FirebaseListObservable<User[]>;

  constructor(public dialog: MdDialog, public af: AngularFire) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

@Component({
  selector: 'app-admin-add-user-dialog',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserDialogComponent {
  constructor(public dialogRef: MdDialogRef<AddUserDialogComponent>) {}

  onCreateUserButtonClick(nickname, email, password, type, name, phone) {
    this.dialogRef.close(<User>{
      nickname: nickname,
      email: email,
      password: password,
      type: parseInt(type, 10),
      name: name,
      phone: phone,
    });
  }
}
