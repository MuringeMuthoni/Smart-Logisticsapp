import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking-dashboard',
  templateUrl: './tracking-dashboard.page.html',
  styleUrls: ['./tracking-dashboard.page.scss'],
})
export class TrackingDashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotovehiclelist()
  {
    this.router.navigate(['/vehicle-list']); 
    
  }
}
