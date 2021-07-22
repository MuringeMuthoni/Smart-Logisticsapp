import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { WcfService } from '../wcf.service';
import { Location } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {
  daBuilding
  no_items_found_new:boolean=false;
  donotshow:boolean=false;
  segmentModel = "All";
  constructor(private wcf:WcfService, private modalController:ModalController,
    private dom: DomSanitizer,private Loc: Location,
    private router:Router,) {

// this.daBuilding = [
//       { id: 1,avatarimage:'assets/imgs/tracking.png', prodname: 'Ace -KCA 128J"',assetkm: 'Moving(73kph)',  },
   
//       { id: 2,avatarimage:'assets/imgs/tracking.png', prodname: 'Monk -KCA 128J"',assetkm: 'Static (58Mins)',  },
   
//       { id: 3,avatarimage:'assets/imgs/tracking.png', prodname: 'Alchemist -KCA 128J"',assetkm: 'Moving(73kph)', },
   
//       { id: 4,avatarimage:'assets/imgs/tracking.png', prodname: 'Sage -KCA 128J"',assetkm: 'Moving(73kph)',  },
//       { id: 5,avatarimage:'assets/imgs/tracking.png', prodname: 'Premio -KCA 128J"',assetkm: 'Moving(73kph)',  },
//       { id: 6,avatarimage:'assets/imgs/tracking.png', prodname: 'M1 -KCA 128J"',assetkm: 'Moving(73kph)',  },
   
         
//     ];

   }

   gotodashboard()
   {
     this.router.navigate(['/tabs']); 
   }
   
   go_home(){
 
     this.Loc.back();
    
   }
   items_ziko:boolean=false;
   no_items_found:boolean=false;
   items_ziko_new:boolean=false
    dataReturned
  ngOnInit() {
    this.wcf.where_from = "live"   
  
     var tosend = this.wcf.Usermesso + ";" + "All" +";7979"
     this.openModal(tosend)
    
  }
 
  divlive:boolean=false
  items=""
  itemall;
  itemonline;
  skeleton;
  itemoffline;

  async openModal(idata) {

    console.log( "this.pnamethis.Wcf.Contents idata " + idata)
    const modal = await this.modalController.create({
      component: PopMessagesPage ,
      swipeToClose: false,
      componentProps: {
        "paramID": 2,   //this for reaching the right function
        "paramTitle": idata,
       
       },
      cssClass: 'posting-popup',     
      backdropDismiss:false, 
      
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        console.log("this.dataReturned: " + this.dataReturned);
       // this.products = []
    
        
       // this.fb.logEvent(this.fb.EVENTS.EVENT_PARAM_SEARCH_STRING)
       // this.fb.logEvent(this.fb.EVENTS.EVENT_PARAM_SEARCH_STRING,this.pname,0)
    
    
        if (this.dataReturned == ""){
          this.no_items_found=true;
          this.items_ziko=false
          this.no_items_found_new =true;
          this.items_ziko_new = false
          this.items = ""
        }else{
          this.no_items_found=false;
          this.items_ziko=true
          this.no_items_found_new =false;
          this.items_ziko_new = true
          this.Load_data(this.dataReturned);
        }
       
        
      }
    });
    
    return await modal.present();
    }
    




    Load_data(data){     
      this.itemall = [];   
       console.log('VEhicle data back:' +data)
       var splitongoing = data.split("|");       
       for(let i=0; i<splitongoing.length; i++){ 
        if( splitongoing[i] == undefined){
          return    
        }     
        var Desc = splitongoing[i].split(";"); 
        console.log('all: ' +Desc)
        if( Desc == undefined){
          return    
      }
      else{  
        var vehreg = Desc[0]
        console.log('vehreg: ' +vehreg)
        var vehstatus = Desc[1]; 
        console.log('vehstatus: ' +vehstatus)
        var vehlattitide = Desc[2]; 
        console.log('vehlattitide: ' +vehlattitide)
        var vehlongitude = Desc[3];
        console.log('vehlongitude: ' +vehlongitude)

      

        this.itemall.push({                               
          avatarimage:'assets/imgs/tracking.png',
          vehreg:   vehreg, 
          vehstatus: vehstatus,
          vehlattitide: vehlattitide ,
          vehlongitude: vehlongitude  ,                       
        });
        
        this.itemonline = [];
        var getstatus = vehstatus.split("Offline");



        if (vehstatus == "Online"){
          console.log("Online segment"  + vehstatus)
          this.itemall.push({                               
            avatarimage:'assets/imgs/tracking.png',
            vehreg:   vehreg, 
            vehstatus: vehstatus,
            vehlattitide: vehlattitide ,
            vehlongitude: vehlongitude  ,                       
          });
          }
          
        else if(vehstatus == "Offline"){  
          this.itemoffline = [];
          this.itemall.push({                               
            avatarimage:'assets/imgs/offline tracker.png',
            vehreg:   vehreg, 
            vehstatus: vehstatus,
            vehlattitide: vehlattitide ,
            vehlongitude: vehlongitude  ,                       
          });

        }  
      }             
                      
    



      }
       
        
                  
                   
                    
                     
                   
                    }
                   
                     
 
                    itemTapped(item){

                      console.log('sel ' + item.vehlattitide + "" + item.vehlongitude)
              
                      this.wcf.Contents = item.vehlattitide + ";" + item.vehlongitude + ";" + item.vehreg 
                      console.log('sel  this.wcf.Contents ' +  this.wcf.Contents)                    
                      this.router.navigate(['/tracking']); 
                  
                  
                    }

             }
      
                      
              
           
 