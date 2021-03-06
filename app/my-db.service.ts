import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { WcfService } from './wcf.service';

@Injectable({
  providedIn: 'root'
})
export class MyDbService {
  public db:any;
  public dbname: String ="db009";
  public isloged = 0; 
  Startbit = "7878";
  Stopbit = "7979";

  
  constructor(private sqlite: SQLite,private platform: Platform,private http: HTTP,
    private Wcf:WcfService ) { }


    


    ngOnit(){
      this.platform.ready().then(()=> {
        this.initializeDatabase();
      });
    }

 


  initializeDatabase(){
            return new Promise((resolve) =>{         
              try {
                var dbnow : String = this.Wcf.dbname;
                  this.sqlite.create({
                    name: "" + dbnow,
                    location: 'default'
                  })   
                      .then((db: SQLiteObject) =>{
                        this.db = db;
                        console.log('Db console' + this.Wcf.dbname )
                      
                        db.executeSql('create table  IF NOT EXISTS users(rowid INTEGER PRIMARY KEY,colmesso VARCHAR(50),coluserid VARCHAR(50),coljustanumber  VARCHAR(50))', [])  
                        .catch(e => console.log( "e" +  e));
                        console.log('nimecreate zote');
                        resolve(this.Wcf.dbname)
                  })

                 


              } catch (error) {
                console.log('db error2 ' + error);
              }
              
             
            })
    
    }

   

   public stringToHex(str) {
    //console.log('hexing');  
    
    try {
        var hex,i;
        var results = '';         
        for (i=0 ; i<str.length;i++){
          hex = str.charCodeAt(i).toString(16);
          results += ('000' + hex).slice(-2);
        }
      // console.log('hex is'  + hex);  
        return results;
      
    } catch (error) {
      console.log('error '  + error);  
    }
  
    }
  

  public HextoString(str) {
    // console.log('hexing back');  
     
     try {
          var j;
          var hexes = str.match(/.{1,4}/g) || [];
          var back = '';

         for (j=0 ; j<hexes.length;j++){
           back += String.fromCharCode(parseInt(hexes[j],16));
         }
        // console.log('hex back'  +back);       
         return back;
       
     } catch (error) {
       console.log('error '  + error);  
     }
    
     }





}
