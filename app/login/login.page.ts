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
      var useremail = this.usage['txtuser'];
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
             this.Wcf.Password = pass;
     
    
            var data = useremail + ";" + pass + ";"+ "7979"
            console.log ('contents:data ' + data);  
          
              
          this.Wcf.Count = 0;      
          this.Wcf.Contents = data ;
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
     "paramID": 0,   //this for reaching the right function
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

         if  (zote.indexOf("no") >=0) {
               alert('Sorry, wrong credentials used. Please try again')
                   
          }else if  (zote.indexOf("error") >=0) {
            //this.ThisMessage[0] = "Error encoutered";
            alert(this.Wcf.Error_message)
        
          }else if  (zote.indexOf("yes") >=0) {
            this.ThisMessage[0] = " Working. Please wait.....";
                    
             console.log('this.ThisMessage[0]' + this.ThisMessage[0]); 
            this.Wcf.Usermesso = zote[0];
            this.Wcf.User_id = zote[1]   
            var justanumber= zote[2];
                    console.log('this.Wcf.Usermesso;' + this.Wcf.Usermesso + "this.Wcf.User_id;" + this.Wcf.User_id + "justanumber" + justanumber); 
            this.router.navigate(['/login']);  
          
             console.log('User_id User_id' + this.Wcf.User_id); 
            this.save_user_Data();         
             this.Procceed(); 
        }else {
          alert(this.Wcf.Error_message)
        }
    }



    
  save_user_Data() {
    console.log('db created: ' + this.dbname)
    this.Count = 0;
    this.sqlite.create({
      name: "" + this.Wcf.dbname,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
     console.log('saving data now ' + this.Wcf.Usermesso + 'this.wcf.User_id;' + ',' + this.Wcf.User_id  );
      db.executeSql('INSERT INTO users VALUES(NULL,?,?,?)',[this.Wcf.Usermesso,this.Wcf.User_id])
        .then(res => {
        // console.log('saved data now ' + this.data.coluser + ' , type: ' + this.Acctype );    
          this.Count=1;  
             this.Procceed()
    console.log('saved '   );
        })
        .catch(e => {
          console.log('error is: ' + e);         
        });
  
    }).catch(e => {
      console.log('error 3 is: ' + e);         
    });
    
    
  }
  


    Procceed() { 
 console.log('saved data default '  );  

      this.router.navigate(['/default']); 

              
     
      }
  

      register(){
        this.router.navigate(['/registration']);
      }

      
    }
  





