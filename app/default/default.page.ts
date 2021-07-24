import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { LoadingController,  ModalController } from '@ionic/angular';
import {interval} from 'rxjs';
import { MyDbService } from '../my-db.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {
 

  constructor(private sqlite: SQLite,public loadingController: LoadingController,private modalController:ModalController,
    private platform: Platform ,public Conn: ConnectService, 
    public Wcf: WcfService,public mydb:MyDbService,private router: Router,

    ) { }
    subscription;
    pointerVisible: boolean =false;
    Count : number;
    dep : string;
    exits=0;

  ngOnInit() {

    this.Wcf.reload = 0
    console.log('default... ' );
    this.platform.ready().then(()=> {
          this.check_connection();
    })
    

  }

   
  checknet;
  check_connection(){        
    this.Wcf.try_connect()
    .then((data)=>{                           
          if (data == true){
            this.pointerVisible=false;
          
            try {
              clearInterval(this.checknet);  
            } catch (error) {                
            }

            this.mydb.initializeDatabase()
            .then((data) => {   
              this.Get_users();
            })

                      
            
          }else{
            this.pointerVisible=true;
              
            if (this.checknet == null){
              this.checknet = setInterval(()=> { this.check_connection() }, 1000); 
            }                     
          }
    });
  }


 
  Get_users(){ 
   
    console.log('on geting users')

    try {           
      
      this.mydb.db.executeSql('SELECT coluser,uref,ctype,unames FROM users ORDER BY rowid DESC', {})
         .then(res => {          
           if (res.rows.length > 0){      
            ///this.Wcf.Fetched_user =   res.rows.item(0).coluser;          
            this.Wcf.User_id  =   res.rows.item(0).uref;             
            this.Wcf.Acctype  = res.rows.item(0).ctype;
            this.Wcf.Mcode = this.Wcf.User_id ;  
            this.Wcf.user_names =    res.rows.item(0).unames;    
            console.log("user_names:" + this.Wcf.user_names + ' | '+ this.Wcf.User_id  )  
           // console.log("Acctype" + this.Wcf.Acctype  )   
                  
             this.Count=1;          
           }else{   
            console.log("User_id hakuna"  ) 
            this.Count = 0;           
           } 
            this.proceed_home();
           
       })
       .catch(e => console.log('db error is: ' + e));
    
   } catch (error) {
     console.log('db error ' + error);
        
    }
   
  
  }
  

  
  ionViewWillEnter(){
      
     console.log('dispatch on will enter ' + this.Wcf.ison);

    if (this.Wcf.reload == 2){
      this.Wcf.reload = 1
      this.router.navigate(['/tabs']); 
    }else if (this.Wcf.reload == 1){
      navigator['app'].exitApp(); 
    }else{
      this.proceed_home()
    }
    
     this.Wcf.ison=1;

  }



  ngOnDestroy(){

  }
  

    proceed_home(){

      console.log('on proceed: ' + this.Count)
     
          if (this.Count >0){
              this.router.navigate(['/tabs']); 
             // this.ShowList()
            }else{  
              this.Wcf.user_log_status = "unregistered"
              this.router.navigate(['/intro']);
          }


    }


    divnonet: boolean =false;
    


//pointerVisible: boolean =false;
data: any;
Contents=''; 
items: Array<{saa: string, Client:string, from: string,To: string, Veh: string}>;
itemss: Array<{ nnone: string}>;
itttems:Array<{ oofline: string}>;
loading;
TotalMessage = [''];
RequestMsg = [''];
RequestMsg2 =[''];
RequestMsg3 =[''];
backmsg =[''];
Cnames = [''];
Cbranch = [''];
Orderno = [''];

divbilatrip: boolean =true;
divwithtrip: boolean =false;
bttnred: boolean =true;
bttngreen: boolean =false;
Status_trip;

//ponterlst: boolean =true;
//ponternotrip: boolean =false;
//ponterfound: boolean =false;
bttproceed:boolean =false;
lblmesso: boolean =true;
lblnone: boolean =false;
bttstart:boolean=false;

get_duration_interval: any;
did_alert:boolean=false;

      





   
}
