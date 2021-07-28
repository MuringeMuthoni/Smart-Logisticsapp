import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController,  Platform } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import {DomSanitizer} from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
declare var google: any;
@Component({
  selector: 'app-tracking-all',
  templateUrl: './tracking-all.page.html',
  styleUrls: ['./tracking-all.page.scss'],
})
export class TrackingAllPage implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef<HTMLDivElement>;
  map;
  markers = []; 
  Loading: any;
  Tracking = "Tracking All"
 
  
  address: any = {
    place: '',
    set: false,
    latlng: google.maps.LatLng
  };

  address_dest: any = {
    place: '',
    set: false,
    latlng: google.maps.LatLng
  };
  constructor(public navCtrl: NavController,public alertController: AlertController, private modalController:ModalController,
    private router:Router,public platform: Platform,public wcf: WcfService,private loadingCtrl: LoadingController,private Loc: Location,
  ) {   

  }

  
  vehlattitide;
  vehlongitude; 
  vehreg;



  
 loaded=0; 
 currentPosition: string = 'Please wait..';





Contents


loadmap(idata){

console.log('init map in' + idata);
 var data = idata
var splitvehicle = data.split(";");  
this.vehlattitide = "-1.2180854"
console.log('this.vehlattitide: ' +this.vehlattitide)
 this.vehlongitude = "36.8913922"; 
console.log(' this.vehlongitude: ' + this.vehlongitude)
this.vehreg = splitvehicle[2]; 
console.log(' this.vehreg: ' + this.vehreg)

//var pna =  this.Wcf.platlng.split(",");    
//console.log('init map data ' + this.Wcf.platlng);   
// console.log('init map data2 ' + this.Wcf.dlatlng); 
     
var lat1 =this.vehlattitide;
var lon1 = this.vehlongitude;
// console.log('init map data2 ' + lat1 + ' . ' + lon1); 
//var lats = lat1.replace("(","");
//var lon = lon1.replace(")",""); 

//var plon = lon.substring(0, 10); 
var ori = new google.maps.LatLng(lat1,lon1);


  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 17,
       center: ori
  });

  let infoWindow = new google.maps.InfoWindow({
    content: "<b>Vehicle Location</b>"
  });
  let marker = new google.maps.Marker({
    map:  this.map,     
    position: ori
  });
  infoWindow.open(this.map, marker);
  
  // this.address.latlng = ori
  // var pick = new google.maps.LatLng(this.Wcf.dlat,this.Wcf.dlng);
  // this.address_dest.latlng =pick

 // this.startNavigating()
  // google.maps.event.addListener(marker, 'click', () => {
  //   infoWindow.open(this.map, marker);
  // });


 
// this.directionsDisplay.setMap(this.map);
// this.calculateAndDisplayRoute(ori,dest);
// console.log('mwisho' );



}
gettrips_online(){
   
  var vreg = "All"
  //the api will return one vehicle if variable vreg is All


      this.Contents = this.wcf.User_id + ";" + vreg + "7979";
    this.wcf.get_trips_asynch(this.Contents)
      .then((data)=>{
          this.wait_async_feedback(data);
        },
        (error) => {
          console.log('error iko: ' + error.error);
          //this.ThisMessage[0] = 'Off synch. Reconnecting….'; 
        }
      );
     


 

}

  Ecount = 0;
  net_iko = 1;
  wait_async_feedback(feedback){
        this.net_iko = 1;
        var zote = feedback.split(";");              

              for(let i=0; i<zote.length; i++){               
                var Desc = zote[i].split(",");  
               
                if (Desc.length>2) { 
               
                    var Reg =Desc[0];
                    var L =Desc[1];
                    var Lo =Desc[2]; 
                    var Online_status = Desc[4];
                    var Where_status = Desc[5];
                    var Trips =Desc[10];
                    var Aliase =Desc[11];
                    var SAlerts = Desc[13];
                    var Ddist = Desc[14];
                    var Ps_status = Desc[15];

                   
                   
                    var Alert ="";
                    if (SAlerts.indexOf('0') >= 0){
                      Alert = '';   
                    }else{
                      var al =0;
                      al = +SAlerts;
                      if (al>1){
                        Alert = SAlerts ;  
                      }else{
                        Alert = SAlerts ;  
                      }                       
                    }

                                 
                   
                     
              
              }
                            
    
              }

                          
                 

   
    }

    go_home(){
 
      this.Loc.back();
     
    }
    ngOnInit() {
      var tosend = this.wcf.User_id + ";" + "All" +";7979"
      console.log( "openModal tosend" + tosend)
      this.openModal(tosend)
    }

    dataReturned;
    async openModal(idata) {

      console.log( "openModal idata" + idata)
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
        
      
      
          if (this.dataReturned == ""){
           
          }else{
            
            this.loadmap(this.dataReturned);
          }
         
          
        }
      });
      
      return await modal.present();
      }
      
      itemall;
      itemonline;
      itemoffline;
  
     
                    
                    
                    
             
                    
                    
   

}
