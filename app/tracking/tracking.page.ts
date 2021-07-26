
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController,  Platform } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { Location } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})


export class TrackingPage {
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
  constructor(public navCtrl: NavController,public alertController: AlertController,
    public platform: Platform,public wcf: WcfService,private loadingCtrl: LoadingController,private Loc: Location,
  ) {   

  }

  
  ngAfterViewInit() {
    this.platform.ready().then(()=> { 
      this.presentLoading();    
     
     });
   
    //this.divpost = false
  }
  vehlattitide;
  vehlongitude; 
  vehreg;



  
 loaded=0; 
 currentPosition: string = 'Please wait..';
 initMap() {
  var lats=-1.2680238;
  var plon = 36.8281785;
    
  var ori = new google.maps.LatLng(lats,plon);
   
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
         center: ori
    });


    this.presentLoading()
  }




Contents
async presentLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Loading trip path. Please wait...',
    duration: 2000
  });
  await loading.present();
 
  this.loadmap();

}

loadmap(){

console.log('init map in');
var data = this.wcf.Contents
var splitvehicle = data.split(";");  
this.vehlattitide = splitvehicle[0]
console.log('this.vehlattitide: ' +this.vehlattitide)
 this.vehlongitude = splitvehicle[1]; 
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


// var dna =  this.Wcf.dlatlng.split(",");            
//var lat2 = dna[0].trim();
//var lon2 = dna[1].trim();

//lats = lat2.replace("(","");
//lon = lon2.replace(")",""); 
//var dlon = lon.substring(0,10);
//var dest = new google.maps.LatLng(lats, lon); 

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

}
