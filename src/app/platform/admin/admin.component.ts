import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdDialogRef, MdDialog } from '@angular/material';

import { AuthService } from '../../auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: FirebaseListObservable<User[]>;

  columns = [
    {name: 'Nickname'},
    {name: 'Email'},
    //{name: 'Password'},
    {name: 'Type'},
    {name: 'Name'},
    {name: 'Phone'},
  ];

  constructor(public dialog: MdDialog, public af: AngularFire, public auth: AuthService) {
    this.users = af.database.list('/users');
  }

  ngOnInit() {
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe((result: User) => {
      this.auth.register(result.email, result.password);
      delete result.password; // remove from the object
      this.users.push(result);
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
