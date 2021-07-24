import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';

import * as AES from 'crypto-js/aes';
import { MyDbService } from '../my-db.service';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 
  Count : number;

  admin = {email: ""};
  public dbname: String ="db_ins_master";
  dep : string;
  subscription;
  pointerVisible: boolean =false;
  constructor(private router: Router,private menuCtrl:MenuController,public modalController: ModalController,
    private Wcf:WcfService,private sqlite: SQLite,public mydb:MyDbService,
    private Conn:ConnectService,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    ) { }

    ThisMessage = [''];
      
    usage={
      txtuser:'',
      txtphone:'',
      password:'',
    }
    
    
    Startbit = "7878";
    Stopbit = "7979";
    Contents;
    usertype;
    cargo = [''];
  
    ngOnInit() {
      console.log('ionViewDidLoad Login2Page');
      
      this.menuCtrl.enable(false);
      console.log('path: ' +location.pathname );
    }
  
  
    
    Fetch_account(){

      //this.ThisMessage[0] = "";
   
      var username  = this.usage['txtuser'];
      var pass  = this.usage['password'];    
      this.Wcf.Password = this.usage['password'];

     // this.ThisMessage[0] = "";
  
      if (username.length<1){    
        alert("Please enter a username")
        return;
      }
      if (username.length<3){
        alert("Please enter a valid username. Minimum length is 4")
        return;
      }
          
      
      if (pass == undefined){
        alert("Password cannot be blank")
        return;
      }  

    
         
        if(username.length<10) {
          alert('phone number is invalid: ' + username);
          return
        }
       
        var User 
        if (username.includes("+")){
          User = username.replace("+","")
        }else{
          User =  username
        }
        var start = username.substring(0,1)
        if (start == "0"){
          var trimuser =  username.replace("0","")    
          User = "254" + trimuser
        }else{
          User =  username
        }
        var tels = User.trim()

  

      console.log ('username: ' + tels);  
      this.Wcf.Fetched_user = tels;
      this.Wcf.Username = tels
      this.Wcf.Password = pass;
     
      this.Wcf.Protocal ="04"
     var data = tels + ";" + pass + ";"+   this.Wcf.fireid
     console.log ('contents: ' + data);  
   
      
          this.Wcf.Count = 0;
          var MainURL = "https://api.logistics.co.ke/Jujus.svc/Client_Connection?Contents=";          
          var encrypted = AES.encrypt(data,'att@2020@').toString(); 
          this.awaitmode=1;   
          this.Wcf.Contents =  encrypted + "|" + MainURL;
          console.log ('contents is ' + this.Wcf.Contents); 
          this.openModal();   
   
   }



 awaitmode
dataReturned:any;
async openModal() {

  console.log('model ' + this.Wcf.Contents)

 const modal = await this.modalController.create({
   component: PopMessagesPage ,
  // swipeToClose: true,
   componentProps: {
     "paramID": this.awaitmode,   //this for reaching the right function
     "paramTitle": this.Wcf.Contents,
    },
   cssClass: 'posting-popup',     
 });
 modal.onDidDismiss().then((dataReturned) => {
   if (dataReturned !== null) {
     this.dataReturned = dataReturned.data;
     console.log("this.dataReturned: " + dataReturned);

    
      this.wait_async(this.dataReturned)
   
      
    
          
   }
 });

 return await modal.present();
}
      
  
    wait_async(data){
          
        console.log('loading  ' + data); 
        var zote = data.split(";");
             
            console.log("zote "+ zote)
         if  (zote.indexOf("Not") >=0) {
           alert('Sorry, wrong credentials used. Please try again')
                   
          }else if  (zote.indexOf("error") >=0) {
            //this.ThisMessage[0] = "Error encoutered";
            alert(this.Wcf.Error_message)
        
        
        }else {
            this.ThisMessage[0] = " Working. Please wait.....";
                    

           this.Wcf.User_id = zote[0];
           this.Wcf.Acctype = zote[1]   
           var cred_status = zote[2];
           this.Wcf.user_names = zote[3]

           if (cred_status == "initial"){
             alert("Welcome to your partners account. Please change your password on the next")
            this.router.navigate(['/login-initial']);  
           }else{
            console.log('User_id ' + this.Wcf.user_names); 
            this.Wcf.save_user_Data(this.Wcf.user_names);         
            this.Procceed(); 
           }

          



       }  
  
    }



    

    Procceed() { 

      this.Wcf.reload = 2
      this.router.navigate(['/default']); 

              
     
      }
  

      register(){
        this.router.navigate(['/registration-form']);
      }

      
      Password_assist(){
        this.router.navigate(['/password-assist'])
      }
    }
  





