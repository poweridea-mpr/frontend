import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Risk } from '../../models/risk.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  riskData: Risk[] = [];

  constructor(public af: AngularFire) {
    this.af.database.list('/risks').subscribe(data => {
      this.riskData = data;
      this.drawChart();
    });
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['gantt']});
    //google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    this.riskData.map(item => {
      data.addRows([[item.project, item.name, item.from, item.to, null,  100,  null]]);
    });

    var options = {
      height: 400,
      gantt: {
        trackHeight: 30
      }
    };

    var chart = new google.visualization.Gantt(document.getElementById('chart'));
    chart.draw(data, options);
  }
}
