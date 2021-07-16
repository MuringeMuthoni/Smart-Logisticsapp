import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  vehreg
  constructor() { 
    this.vehreg = [
      { id: 1, assetimg: 'assets/imgs/expenses-box.png', description:"Expense Reports",},
   
      { id: 2,assetimg: 'assets/imgs/fuel-box.png',  description:" Fuel Reports"},
   
      { id: 3, assetimg: 'assets/imgs/scheduler-box.png ', description:"Schedule Reports" },
   
    
   
         
    ];
  }

  ngOnInit() {
  }

}
