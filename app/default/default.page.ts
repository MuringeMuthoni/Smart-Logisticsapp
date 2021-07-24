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
      
      this.mydb.db.executeSql('SELECT colmesso ,coluserid,coljustanumber FROM users ORDER BY rowid DESC', {})
         .then(res => {          
           if (res.rows.length > 0){      
            ///this.Wcf.Fetched_user =   res.rows.item(0).coluser;          
            this.Wcf.Usermesso  =   res.rows.item(0).colmesso;             
            this.Wcf.User_id  = res.rows.item(0).coluserid;
       
            console.log("Usermesso:" + this.Wcf.Usermesso + ' | '+ this.Wcf.User_id  )  
           // console.log("Acctype" + this.Wcf.Acctype  )   
                  
             this.Count=1;     
            // this.router.navigate(['/tabs']); 
           this.router.navigate(['/tabs']); 
           }else{   
            console.log("User_id hakuna"  ) 
            this.Count = 0;
            this.router.navigate(['/intro']);            
           } 
            //this.proceed_home();
           
       })
       .catch(e => console.log('db error is: ' + e));
    
   } catch (error) {
     console.log('db error ' + error);
        
    }
   
  
  }
  proceed_home(){
    console.log('proceed_home ')
     this.router.navigate(['/tabs']);
  }

  
  ionViewWillEnter(){
      
   

  }



  ngOnDestroy(){

  }
  

    


      





   
}
