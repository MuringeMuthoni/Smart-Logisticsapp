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
  SelTel =[''];
  Selemail =[''];
  Appversion =[''];
  constructor(private sqlite: SQLite,public loadingController: LoadingController,
    private platform: Platform ,public Conn: ConnectService,public modalController: ModalController,
    public Wcf: WcfService,public mydb:MyDbService,private router: Router,private wcf:WcfService,

    ) { }
   
    subscription;
 pointerVisible: boolean =false;
    Count : number;
    dep : string;
    exits=0;
    myphoto
  ngOnInit() {
   

    this.platform.ready().then(() => {
     
    //this.router.navigate(['/testtest']);

     this.check_connection();  
     
     })
      
  }


  divnonet: boolean =false;
  divnonet2:boolean=true;
  divlogo:boolean=true;
    divgeo:boolean=false;
    divgeo2:boolean=false;
  


    checknet;
    check_connection(){        
      this.Wcf.try_connect()
      .then((data)=>{                           
            if (data == true){
              this.divnonet=false;
              this.divnonet2 =true;

              clearInterval(this.checknet);  
              //this.CheckPermissions(); 

              
              //this.Wcf.user_Geo_loc= "1.2168137!36.906568900000025";
              //this.Wcf.user_Geo_enabled = "disabled"

              this.mydb.initializeDatabase()
              .then(res => {    
               this.Get_users();
             })  
             console.log('default navigate....')
             this.Wcf.where_from = "home"
            

             
          
              
            }else{
              this.divnonet=true;  
              this.divnonet2 =false;
                
              if (this.checknet == null){
                this.checknet = setInterval(()=> { this.check_connection() }, 3850); 
              }                     
            }
      });
    }
    ver
  

    New_signup(){   
      this.mydb.initializeDatabase()
      .then((data) => {   
        this.Get_users();
      })
  
    }
   
    

    Get_users(){ 
     
      
  
      try {           
        
        this.mydb.db.executeSql('SELECT coluserid,colusername,colregno  FROM userss ORDER BY rowid DESC', {})
           .then(res => {          
             if (res.rows.length > 0){      
          
                this.Wcf.Userid =   res.rows.item(0).coluserid;  
                this.Wcf.Usermesso = res.rows.item(0).colusername;
                this.Wcf.colregno = res.rows.item(0).colregno;   
                 
                //this.Wcf.fetchedpasswords = res.rows.item(0).colpasswords; 

                console.log('user details: ' + this.Wcf.Userid + ", " + this.Wcf.Usermesso  + ", " + this.Wcf.colregno  )
                            
                  this.Count=1;
                           
                  this.router.navigate(['/tabs']); 
                
               
             }else{   
              
              this.mydb.db.executeSql('SELECT regid  FROM reginfo', {})
              .then(res => {          
                if (res.rows.length > 0){ 
                  this.Wcf.reg_id = res.rows.item(0).regid
                  console.log('reg_id: ' +  this.Wcf.reg_id);                 
                }
              })

              this.Wcf.Userid = 0             
              this.Count = 0;
              this.router.navigate(['/intro']); 
              //this.router.navigate(['/testtest']);
             
             }        
         })
         .catch(e => console.log('db error is: ' + e));         
     } catch (error) {
       console.log('db error ' + error);     
      }   
    }
    
     
  
    
    ionViewWillEnter(){
      console.log('on will enter ' + this.Wcf.ison);      
       this.New_signup();  
       this.Wcf.ison=1;
  
    }
  

    ngOnDestroy(){
  
    }
  
  
  
  
   
  
}
