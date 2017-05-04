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
      console.log(data);
      this.riskData = data;
    });
  }

  ngOnInit() {
    //google.load("visualization", "1", {packages:["corechart"]});
    google.charts.load('current', {packages: ['gantt']});
    //google.charts.setOnLoadCallback(this.drawChart);
  }

  ngAfterViewInit() {
    this.drawChart();
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

    let newRows = [];
    this.riskData.map(item => {
      newRows.push([item.$key, item.name, new Date(item.from), new Date(item.to), null,  100,  null]);
    });
    data.addRows(newRows);
    console.log(newRows);

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

  