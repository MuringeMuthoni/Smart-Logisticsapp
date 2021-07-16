import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
})
export class FuelPage implements OnInit {
 
  usage={
    vehreg:'',
    fuellitres:'',
    fuelamount:'',
   
  }
  showlist:boolean=true;
  closelist:boolean=false;
  viewlistt:boolean=false;
  viewentry:boolean=true;
  vehreg
  Fuelreport
  constructor(private Loc: Location) {
    this.vehreg = [
      { id: 1, prodname: 'Ace', liters:" 23 litres",amount:" 25,000"},
   
      { id: 2,prodname: 'Monk',  liters:" 22 litres",amount:" 23,000"},
   
      { id: 3, prodname: 'Alchemist ', liters:" 21 litres",amount:" 22,000" },
   
      { id: 4, prodname: 'Sage', liters:" 20 litres" ,amount:" 25,000" },
      { id: 5, prodname: 'Premio' ,liters:" 24 litres" ,amount:" 24,000"  },
      { id: 6, prodname: 'M1 ',liters:" 25 litres" ,amount:" 27,000"},
   
         
    ];
   
   }

  ngOnInit() {
  }
   showfuellist(){
     this.showlist = false;
     this.closelist = true;
     this.viewentry = false;
     this.viewlistt = true;

   }
   closefuellist(){
    this.showlist = true;
    this.closelist = false;
    this.viewentry = true;
    this.viewlistt = false;

  }
  go_home(){

    this.Loc.back();
   
  }
}
