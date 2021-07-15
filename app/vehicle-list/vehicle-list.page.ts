import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {
  daBuilding
  no_items_found_new:boolean=false;
  segmentModel = "All";
  constructor(private router: Router) {
this.daBuilding = [
      { id: 1,avatarimage:'assets/imgs/tracking.png', prodname: 'Ace -KCA 128J"',assetkm: 'Moving(73kph)',  },
   
      { id: 2,avatarimage:'assets/imgs/tracking.png', prodname: 'Monk -KCA 128J"',assetkm: 'Static (58Mins)',  },
   
      { id: 3,avatarimage:'assets/imgs/tracking.png', prodname: 'Alchemist -KCA 128J"',assetkm: 'Moving(73kph)', },
   
      { id: 4,avatarimage:'assets/imgs/tracking.png', prodname: 'Sage -KCA 128J"',assetkm: 'Moving(73kph)',  },
      { id: 5,avatarimage:'assets/imgs/tracking.png', prodname: 'Premio -KCA 128J"',assetkm: 'Moving(73kph)',  },
      { id: 6,avatarimage:'assets/imgs/tracking.png', prodname: 'M1 -KCA 128J"',assetkm: 'Moving(73kph)',  },
   
         
    ];

   }

  ngOnInit() {
  }
  gotodashboard()
  {
    this.router.navigate(['/tabs']); 
  }
}
