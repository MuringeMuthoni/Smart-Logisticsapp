import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  usage={
    vehreg:'',
    entrydate:'',
    description:'',
    expamo:'',
   
  }
  showlist:boolean=true;
  closelist:boolean=false;
  viewlistt:boolean=false;
  viewentry:boolean=true;
  vehreg
  Fuelreport
  constructor(private Loc: Location) {
    this.vehreg = [
      { id: 1, prodname: 'Ace', description:"Insuarance",dateleo:" 05-06-2021",amount:'55,000'},
   
      { id: 2,prodname: 'Monk',  description:" Inspection",dateleo:"15-06-2021",amount:'32,000'},
   
      { id: 3, prodname: 'Alchemist ', description:"NTSA",dateleo:"25-06-2021" ,amount:'25,000'},
   
      { id: 4, prodname: 'Sage', description:"License" ,dateleo:"02-06-2021" ,amount:'26,000'},
      { id: 5, prodname: 'Premio' ,description:"Kanjo" ,dateleo:"03-06-2021"  ,amount:'27,000'},
      { id: 6, prodname: 'M1 ',description:"Annual checkup" ,dateleo:"04-05-2021",amount:'30,000' },
   
         
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
