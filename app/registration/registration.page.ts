import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { DatePipe, Location } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { MyDbService } from '../my-db.service';
import { ConnectService } from '../connect.service';
import { WcfService } from '../wcf.service';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { PopAlertPage } from '../pop-alert/pop-alert.page';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  
  usage={
    fullname:'',   
    phonenumber:'',
    emailname:'',
    regnumber:'',
  
  }
  chart: Array <any>;
  segmentModel = "all";
 
  public dbname: String ="db_ins_master";
  dep : string;
  
  pointerVisible: boolean =false;
  constructor(private router: Router,private menuCtrl:MenuController,private Loc: Location,
    private Wcf:WcfService,private sqlite: SQLite,public mydb:MyDbService,
    private Conn:ConnectService,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,public modalController: ModalController,
    private datepipe:DatePipe
    ) { 

      
    }

    isTextFieldType: boolean;
  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  ngOnInit() {
    
       this.fetchcourses()
  }

  ionViewWillEnter(){
    //this.Wcf.where_from = "signup"
  }


  go_home(){

    this.Loc.back();
  }
 
  

  
  username;
  tel;
  Useremail;
  colpassword;

 phone = "0"
 status = "none"
 
 Fname
 regnumber;
  create_account(){
    
        var Fname  = this.usage['fullname'];
        console.log("create_account;" + Fname)
        if(Fname.length<2) {        
          var msg = "Sorry, your full name is invalid "
          this.pop_alert(msg)
          return
        }
        this.Fname = Fname


       



         var username  = this.usage['phonenumber']; 
         console.log("create_account username;" + username)
         if(username.length<10) {
           
           var msg = "Sorry, your your phone number + " + tels + " is invalid "
           this.pop_alert(msg)

           return
         }
        var User 
        // if (username.includes("+")){
        //   User = username.replace("+","")
        // }else{
        //   User =  username
        // }
        //721236131
        //254 721 236 131

        var phone = username.toString()
        console.log('phone: ' + phone)

        var start = phone.substring(0,1)
        var sdigit = +start
        console.log('sdigit: ' + sdigit)

        if (phone.length < 12){
          if (sdigit != 2){
            var trimuser =  phone   
            User = "254" + trimuser
          }else{
            User =  username
          }
        }else{
          User = phone
        }
      
        var tels = User //.trim()


        var emails  = this.usage['emailname'];
        console.log("create_account emails;" + emails)
        // var pass  = this.usage['pass'];
        // var pass2  = this.usage['pass2'];

        
          var res = /[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}/
         // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!res.test(emails)) {
            
            var msg = "Sorry, your your email  + " + emails + " is invalid "
            this.pop_alert(msg)

            return
          }

          var regnumber  = this.usage['regnumber']; 
         console.log("create_account regnumber;" + regnumber)
         if(username.length<10) {
           
           var msg = "Sorry, your car's reg number + " + regnumber + " is invalid "
           this.pop_alert(msg)

           return
         }
        
        this.tel = tels;
       // this.colpassword = pass;
        this.Useremail = emails

        this.openModal();

        this.Wcf.Content_back =""
       
     
    }

   
      dataReturned:any;     
          
      async openModal() {
           
          
       
         
            var data =   this.Fname + ";" +  this.tel + ";" + this.Useremail + ";" + this.regnumber  + ";7979"

            console.log('data ' + data)
            const modal = await this.modalController.create({
              component: PopMessagesPage ,
              swipeToClose: false,
              componentProps: {
                "paramID": 1,   //this for reaching the right function
                "paramTitle": data,
                },
              cssClass: 'posting-popup',
              backdropDismiss:false,      
            });
            modal.onDidDismiss().then((dataReturned) => {
              if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                
                console.log("this.dataReturned" + this.dataReturned)
                var feedback = this.dataReturned;  
                console.log(feedback + "rt")   
                
                if (feedback.indexOf("Error") >= 0){       
                    alert(this.Wcf.Error_message);
                }else if (feedback.indexOf("Exists") >= 0){ 
                      //alert("Account Exists, please sign up");
                      var msg = "The phone number already in use on another account. Please sign in"
                      this.pop_alert(msg)
                }else if (feedback.indexOf("Success") >= 0){ 
                // this.userid=feedback;
                
                  //this.Save_user(feedback);
                 // console.log("na save user " + feedback)
                // this.Wcf.regstage = "pending"
 
                 this.alert_mode = 1
                 var msg = "Success! We have received your registration form. Please upload your photo and documents"
                 this.pop_alert(msg)

              
                }else{

                  var msg = this.Wcf.Error_message
                  this.pop_alert(msg)
                }
          
              }
            });
          
            return await modal.present();
      }
        

    
alert_mode=0 
async pop_alert(idata) { 
  const modal = await this.modalController.create({
    component: PopAlertPage ,
    swipeToClose:false,
    componentProps: {
      "paramID": 1,
      "paramTitle": idata,
     },
    cssClass: 'info2',     
  });

  modal.onDidDismiss().then((dataReturned) => {
    
    if (this.alert_mode == 1 ) {      
      //this.router.navigate(['/tabs2']);
      this.router.navigate(['/tracking-dashboard']); 
    }

  });

  return await modal.present();
}


checkitems

// Save_user(feedback){

//   this.mydb.initializeDatabase();   
//   var zote =  feedback.split(";");  
//  // this.Wcf.reg_id = zote[1]; 

//  // this.Wcf.Fetched_email  = this.email
//  // this.Wcf.User_uphone  = this.tel
//   //this.Wcf.user_name = zote[2];
//  // var uname =  this.Wcf.user_name
//   // if (uname == undefined){
//   //   uname ="none"
//   // }
//   try {
           
//     this.mydb.db.executeSql('INSERT INTO reginfo VALUES (NULL, ? )', [ this.Wcf.reg_id ])  
//     .then(res => {          
        
//       this.Wcf.user_log_status = "registered"          
//         })
//         .catch(e => {
//           console.log('error 1 is: ' + e);         
//         });
//   } catch (error) {
//     console.log(error);
//   }



//}



  login(){
    this.router.navigate(['/login']);   
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }
  message;
  fetchcourses() {
  
    var idata = this.Wcf.User_id + ";none"          
    this.Wcf.Contents =  idata ;
    // console.log("this.Wcf.Userid" + this.Wcf.Contents);
     this.openCModal();   
   
   }
   async openCModal() {
   
  
    const modal = await this.modalController.create({
      component: PopMessagesPage ,
      swipeToClose: true,
      componentProps: {
        "paramID": 1,   //this for reaching the right function
        "paramTitle": this.Wcf.Contents,
       },
      cssClass: 'posting-popup',     
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        console.log("this.dataReturned course: " + dataReturned);
        this.await_courseasync(this.dataReturned)
      
      }
    });
  
    return await modal.present();
  }
  
  await_courseasync(idata){
        console.log("this.dataReturned idata: " + idata);
    
      this.chart=[]
      var datas = idata.split("*")
      var units = datas[0]
      //var versions = datas[1]
      console.log("units: " + units);
      var zote = units.split("|") 

      for(let i=0; i<zote.length; i++){
           var idata = zote[i]
           if (idata != undefined){
            if (idata.length>0) { 
              var courses = idata.split(";");    
              var Desc = courses[2];
                this.chart.push( Desc );
            }
          }                   
         
      }           
    //  this.ShowList();


}
}
