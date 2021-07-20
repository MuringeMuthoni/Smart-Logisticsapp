
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, NavController,  Platform } from '@ionic/angular';
import { WcfService } from '../wcf.service';

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
 
  constructor(public navCtrl: NavController,public alertController: AlertController,
    public platform: Platform,public wcf: WcfService,private loadingCtrl: LoadingController,
  ) {   

  }

  
  ngAfterViewInit() {
    this.platform.ready().then(()=> { 
      this.presentLoading();    
     
     });
   
    //this.divpost = false
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
       message: 'Loading Your vehicles. Please wait...',
       duration: 2000
    });
    await loading.present();
    this.initMap()
  
  
  }


  
 loaded=0; 
 currentPosition: string = 'Please wait..';
 initMap() {
      let mapOptions = {
        center: location,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        MyLocationEnabled: true,
        setMyLocationButtonEnabled: true,
        draggable: true,
                  
      }

      var lat1=-1.2680238;
      var lon1 = 36.8281785;
               
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,{
          center: {lat: lat1, lng: lon1},
          zoom: 8,
          clickableIcons: false,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions:mapOptions                             
        });

        var ori = new google.maps.LatLng(lat1,lon1);
        this.currentPosition = ori

             return this.map;

        this.gettrips_online()

      }





Contents

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



}
