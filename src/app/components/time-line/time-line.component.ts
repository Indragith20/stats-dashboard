import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeLineComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);
    this.formatTimeLine(data);
  }

  ngOnInit() {
  }

  formatTimeLine(data) {
    if(data) {
      const formattedTimeLineData = data.map((timeline) => {
                                      if(timeline instanceof Object) {
                                        
                                      }
                                    });
    }
  }

}
