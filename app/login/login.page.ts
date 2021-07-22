import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { MyDbService } from '../my-db.service';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { Platform } from '@ionic/angular';

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
    private alertCtrl: AlertController,private platform: Platform,private Loc: Location
    ) { 
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.Loc.back();
        console.log('Handler was called!');
      });
    }
 
    ThisMessage = [''];      
    usage={
      txtuser:'',
      txtphone:'',
      password:'',
    }
    
      
    
    go_back(){
      this.router.navigate(['/intro']);      
      clearInterval(); 
    }
    
    Startbit = "7878";
    Stopbit = "7979";
    Contents;
    usertype;
    cargo = [''];
  
    ngOnInit() {
     // console.log('ionViewDidLoad Login2Page');
      
      this.menuCtrl.enable(false);
      console.log('path: ' +location.pathname );
    }

    
  ionViewWillEnter(){
    this.Wcf.where_from = "login"
  }
  
  Signup(){
    this.router.navigate(['/sign-up']); 
  }
  Register(){
    this.router.navigate(['/registration-pics']); 
  }

  ForgotPassword(){
    this.router.navigate(['/forgot-password']); 
  }

    Fetch_account(){

      this.ThisMessage[0] = "";
   
      var username  = this.usage['txtuser'];
      var pass  = this.usage['password'];
      //this.Wcf.Username = this.usage['txtuser'];
      //this.Wcf.Password = this.usage['password'];

      this.ThisMessage[0] = "";
  
      if (username.length<1){    
        this.ThisMessage[0] = "Please enter a username";
        return;
      }
      if (username.length<3){
        this.ThisMessage[0] = "Please enter a valid username. Minimum length is 4";
        return;
      }
      
      var psw: string = this.usage['password'];
      console.log('pass is: ' + psw); 
      
      if (psw ==="undefined"){
        this.ThisMessage[0] = "Password cannot be blank";
        return;
      }  
  
      if (psw == null){
        console.log('eml null '); 
        this.ThisMessage[0] = "Email cannot be blank";
        return;
      }  
  
      var psdlens = psw.length;
  
      console.log('pass : ' + psdlens ); 
      if (psdlens<3){
        this.ThisMessage[0] = "Please enter a valid password. Minimum password length is 4";
        return;
      }
  
      if (psw === psw){
      }else{
        this.ThisMessage[0] = "Passwords do not match. please confirm";
        return;
      }
         
      this.Wcf.Fetched_user = this.usage['txtuser'];
     // this.Wcf.Username = this.usage['txtuser'];
     // this.Wcf.Password = pass;
     // this.Wcf.Acctype = this.usertype;


     var data = username + ";" + pass + ";" + "none" +  ";7979"
     console.log ('contents is ' + this.Contents);  
     this.ThisMessage[0] = "Please wait as we authenticate...";
  
    
          this.Wcf.Count = 0;
        
        
          this.awaitmode=0;   
          this.Wcf.Contents =  data;
          this.openModal();   
   
   }


    awaitmode
    dataReturned:any;
    async openModal() {


    const modal = await this.modalController.create({
      component: PopMessagesPage ,
      swipeToClose: true,
      componentProps: {
        "paramID": 0,   //this for reaching the right function
        "paramTitle": this.Wcf.Contents,
        },
      cssClass: 'posting-popup',     
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        console.log("authenticating: " + this.dataReturned);      
          this.wait_async(this.dataReturned)                     
      }
    });

    return await modal.present();
    }
      

  
    wait_async(data){
          
        console.log('loading:  ' + data); 
        var zote = data.split(";");
             
          console.log("zote "+ zote)
         if  (zote.indexOf("Not") >=0) {
           alert('Sorry, wrong credentials used. Please try again')
                   
          }else if  (zote.indexOf("error") >=0) {
            //this.ThisMessage[0] = "Error encoutered";
            alert(this.Wcf.Error_message)
            this.router.navigate(['/intro']);
        
        }else {
            this.ThisMessage[0] = " Working. Please wait.....";
                    

           this.Wcf.Userid = zote[0];
          // this.Wcf.Acctype = zote[1];                  
          //  console.log('account type  ' + this.Wcf.Acctype + "; " + this.Wcf.Userid);
            var savedata = this.Wcf.Userid     
            console.log("savedata"  + "savedata" + savedata)
            this.Save_user(data);
           // this.router.navigate(['/default']); 
           this.router.navigate(['/tabs']); 

       }  
  
    }
    Useryes;
    stdnames;
    regn0;
    Save_user(feedback){
    
      var zote =  feedback.split(";");  
      console.log("nimefika kwa szote" + zote)           
      this.Wcf.Usermesso = zote[0]; 
      this.Wcf.Userid = zote[1]; 
      this.regn0 = zote[2]; 
      console.log('registering user: ' +  this.Wcf.Userid  + ';' + this.Wcf.Userid + ";" +  this.regn0 )    
      try {
         this.mydb.db.executeSql('INSERT INTO userss VALUES (NULL, ?, ? , ? )', [ this.Useryes,this.Wcf.Userid, this.regn0 ])  
      .then(res => {                 
            this.Wcf.user_log_status = "registered";           
            var data =this.Wcf.Userid + ';7979'      
            this.Wcf.Content_back="";
            console.log('data user: ' + data )
            })
            .catch(e => {
              console.log('error 1 is: ' + e);         
            });
      } catch (error) {
        console.log(error);
      }
               

    }



 forgotpassward()
{
  this.router.navigate(['/forgot-password']); 
}
registration()
{
  this.router.navigate(['/registration']); 
}

}
