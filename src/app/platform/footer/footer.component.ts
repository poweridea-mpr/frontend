import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Project, Risk } from '../../models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  projects: FirebaseListObservable<Project[]>;
  risks: FirebaseListObservable<Risk[]>;

  totalProjects: number = 0;
  totalRisks: number = 0;
  totalValue: number = 0;

  constructor(public db: AngularFireDatabase) {
    this.projects = db.list('/projects');
    this.risks = db.list('/risks');

    this.projects.subscribe((projs: Project[]) => {
      this.totalProjects = projs.length;
    });

    this.risks.subscribe((risks: Risk[]) => {
      this.totalRisks = risks.length;
      this.totalValue = risks.reduce((acc, risk) => +acc + (risk.value || 0), 0);
    })
  }

  ngOnInit() {
  }

}
