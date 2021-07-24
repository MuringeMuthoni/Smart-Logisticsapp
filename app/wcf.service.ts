import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class WcfService {
 
  public  user_log_status: string;
  public status:string="" ;
  public Rider_online_status = "";
  public UsageLatLng="";
  

  plat;
  plng;
  dlat;
  dlng
  public tripamo:string;
  public deliamo
  public sid;
  public dist

  public Username: string;
  public Password: string;
  public Protocal = "01"
  public fireid="none";
  public Contents;
  Error_message ="Sorry, we have encoutered an error while processing the request";
  public Content_back;
  public Count : number =0;
  public dbname: String ="E01";
 
  public User_id: string;
  public  Usermesso: string;
  Mcode ="";
  public shoplatln;
  public user_names: string;
  //public Fetched_email;
  

  Prompt_Msg ="Wait..";
  feedback_Msg ="Wait..";
  tracking_Msg ="Wait..";
  activity_Msg ="Wait..";
  Startbit = "7878";
  Stopbit = "7979";
  Reg = "";
  Wherestatus='';
  Onlinestatus='';
  lat=null;
  lon=null;
  nowReg = "";  
  ActDate1 = "";
  Actdate2= "";
  ActAmo = "0";
  Acttype = "";
  Stype = "";
  Seldate1=null;
  Seldate2=null;
  nowlat=null;
  nowlon=null;
  public WcfUser;
  public Wcfemail = 'None';  
  tripid;
  Rtype;
  platlng;
  dlatlng;
  Acctype ="sub";
  cname=""
  public Pickname: string; public Picklatlon: string; 
  public DestName: string; public Destlat: string;
  public ison=0;
  public reload=0;

  constructor(private http: HTTP,private sqlite: SQLite,private network: Network) { }



  data = { coluser: "", colpass:"", uref: "0" };
  thisuser: any;
  thisphone: any;
  thispass: any;
  thisemail: any;

  

      
  Serverconnector(url,Cont){
   
    return new Promise((resolve, reject) =>{              
          
      var Sending_conts = Cont
      var Protocal = this.Protocal;
      var Content = this.stringToHex(Sending_conts);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
      var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
         var MainURL =url 
      var Searchurl = MainURL+ Sending_conts;
      console.log('linklink ' + Searchurl);
     
      this.http.get(Searchurl,{},{})
     .then((data) => {     
      console.log('linklink data' + data);
       Response = data.data;       
        var returned = data.data;
        console.log('linklink returned' + returned);
       var Result = returned.replace("\"","");
       console.log('linklink Result' + Result);
       var rt = Result.replace("\"", "");
       console.log('linklink rt' + rt);
       var rt2 = rt.replace('"', "");    
       console.log('linklink rt2' + rt2);
       if  (rt2.indexOf('error') >= 0) {  
        resolve("error");      
        }else{       
           this.HextoString(rt2)
             .then((hexed) => {             
               var payload = hexed; 
                 resolve(payload);
                console.log('payload.. ' + payload)  
             })    

        }
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        resolve(err);
      })
    })
  
  }

 

  save_user_Data(username) {
    console.log('db created: ' + this.dbname)
    this.Count = 0;
    this.sqlite.create({
      name: "" + this.dbname,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
     // console.log('saving data now ' + this.Fetched_user + ',none' + ',' + this.User_id  + ','+ this.Acctype + ':user: ' + username);
      db.executeSql('INSERT INTO users VALUES(NULL,?,?,?,?)',[this.Usermesso,this.User_id])
        .then(res => {
        // console.log('saved data now ' + this.data.coluser + ' , type: ' + this.Acctype );    
          this.Count=1;  
        
  
        })
        .catch(e => {
          console.log('error is: ' + e);         
        });
  
    }).catch(e => {
      console.log('error 3 is: ' + e);         
    });
    
    
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

 
    public HextoString(hexed) {
      //console.log('hexing back');  
      return new Promise((resolve) =>{         
      try {
            var hex = hexed.toString();//force conversion
            var str = '';
            for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));          
          
          //console.log('hex back: '  +str);       
          resolve(str);  
             
        
      } catch (error) {
        console.log('error '  + error);  
      }
     
      })
    }
    


isconnecting: boolean;
nowisconnected: boolean;
try_connect(){
  //console.log('checking net')
  return new Promise((resolve) =>{ 
    //console.log('checking net2')
  // if no internet, notice is a string
  if (this.network.type == 'none' ) { 
    // stuff if disconnected
    this.nowisconnected = false;
    console.log("hakuna net")
    // reject(this.nowisconnected)
  } else {
    //stuff if connected
    this.nowisconnected = true;
   // console.log("net iko")
  }
    resolve(this.nowisconnected);
    return this.nowisconnected
  })

}

get_trips_asynch(idata){
  return new Promise((resolve, reject) =>{  



   })
}

Post_boda_trip(Cont){

  return new Promise((resolve, reject) =>{   
  this.tracking_Msg =""
 
  this.Prompt_Msg="" 
  var Protocal = "02";
  var Content = this.stringToHex(Cont);
  var MsgLens = Content.length;
  var MsgLength = ('000' + MsgLens).slice(-4); 
  var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
  var MainURL = "https://api.gofer-errands.com/Jujus.svc/boda_request_trip?Contents="      
  var Searchurl = MainURL+ Message2;
  console.log("link " + Searchurl);

 this.http.get(Searchurl,{},{})
 .then((data) => {     
   Response = data.data;       
   
   var returned = data.data;
   var Result = returned.replace("\"","");
   var rt = Result.replace("\"", "");
   var rt2 = rt.replace('"', "");
  // console.log('returned ' + rt2);

   if (rt2.length >0){
   if (rt2 === "error") {
      this.tracking_Msg = "error ";
      console.log('error ' + rt2);
      resolve('Error');  
    }else{
     // this.tracking_Msg = rt2;
     // console.log('return is ' + rt2);
      resolve(rt2);  
    }


  }

 return this.tracking_Msg

  })
  .catch((error) => {
    this.tracking_Msg = "Error";
    console.log('host 1 error: ' + error.error);
    reject("error");
    var err = error.error;   
    if (err ==="The host could not be resolved"){
      console.log("hatupati host"); 
    }
  })

})

}



 
get_boda_dispatch(Cont){
  console.log("cont" + Cont)
    return new Promise((resolve, reject) =>{              
          
      var Sending_conts = Cont
      var Protocal = "01";
      var Content = this.stringToHex(Sending_conts);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
      var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

     
      var MainURL = "https://api.gofer-errands.com/Jujus.svc/boda_request_view?Contents=";   
      var Searchurl = MainURL+ Mes_to_send;
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       //console.log("Response" + Response)
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
      // console.log('return ' + rt2);        
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2);     
        }
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
    })
  
  }


        
check_online_status(contents){
  return new Promise((resolve, reject) =>{        
    var Protocal = "22";
    var Content = this.stringToHex(contents);
    var MsgLens = Content.length;
    var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
    var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

          var MainURL = "https://api.gofer-errands.com/Jujus.svc/boda_online_status?Contents=" + Message2;
          var Searchurl = MainURL+ Message2;   
          console.log(Searchurl);
        this.http.get(Searchurl,{},{})
        .then((data) => {     
          Response = data.data; 
          var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");       
            if (rt2.length >1){                   
              if (rt2 === "error") {
                  reject("error");
              }else{
                    console.log("avail_status_back " + rt2);
                    resolve(rt2);                   
              }
            }        
        })
        .catch((error) => {           
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
         reject(err);
      })             
    })


}


get_boda_account_info(Cont){
  // console.log("cont" + Cont)
     return new Promise((resolve, reject) =>{              
           
       var Sending_conts = Cont
       var Protocal = "01";
       var Content = this.stringToHex(Sending_conts);
       var MsgLens = Content.length;
       var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
       var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      
       var MainURL = "https://api.gofer-errands.com/Jujus.svc/boda_acc_info?Contents=";   
       var Searchurl = MainURL+ Mes_to_send;
       //console.log("link " + Searchurl);
   
      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data;       
      //  console.log("Response" + Response)
        var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");
        //console.log('return ' + rt2);        
         if (rt2 =="Error") {
           reject("username not found");
         }else{
           resolve(rt2);     
         }
     
       })
       .catch((error) => {
        
         console.log('host 1 error: ' + error.error);
         var err = error.error;   
         if (err ==="The host could not be resolved"){
           console.log("hatupati host"); 
         }
         reject(err);
       })
     })
   
   }


   
      
Enter_usage_log(contents){
  return new Promise((resolve, reject) =>{        
    var Protocal = "22";
    var Content = this.stringToHex(contents);
    var MsgLens = Content.length;
    var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
    var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

          var MainURL = "https://api.gofer-errands.com/Jujus.svc/Log_boda_latlng?Contents=" + Message2;
          var Searchurl = MainURL+ Message2;   
         // console.log(Searchurl);
        this.http.get(Searchurl,{},{})
        .then((data) => {     
          Response = data.data; 
          var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");       
            if (rt2.length >1){                   
              if (rt2 === "error") {
                  reject("error");
              }else{
                //  console.log("resolved " + rt2);
                    resolve(rt2);                   
              }
            }        
        })
        .catch((error) => {           
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
         reject(err);
      })             
    })


}



   
Log_off_on(contents){
return new Promise((resolve, reject) =>{        
  var Protocal = "22";
  var Content = this.stringToHex(contents);
  var MsgLens = Content.length;
  var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
  var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

        var MainURL = "https://api.gofer-errands.com/Jujus.svc/Rider_offline?Contents=" + Message2;
        var Searchurl = MainURL+ Message2;   
        console.log(Searchurl);
      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data; 
        var returned = data.data;
      var Result = returned.replace("\"","");
      var rt = Result.replace("\"", "");
      var rt2 = rt.replace('"', "");       
          if (rt2.length >1){                   
            if (rt2 === "error") {
                reject("error");
            }else{
                console.log("resolved " + rt2);
                  resolve(rt2);                   
            }
          }        
      })
      .catch((error) => {           
      console.log('host 1 error: ' + error.error);
      var err = error.error;   
      if (err ==="The host could not be resolved"){
        console.log("hatupati host"); 
      }
       reject(err);
    })             
  })


}



 
Accept_reject_trip(contents){
console.log('contents ' + contents);
return new Promise((resolve, reject) =>{        
  var Protocal = "22";
  var Content = this.stringToHex(contents);
  var MsgLens = Content.length;
  var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
  var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

        var MainURL = "https://api.gofer-errands.com/Jujus.svc/Accept_request?Contents=" + Message2;
        var Searchurl = MainURL+ Message2;   
        console.log('Accepting: ' + Searchurl);
      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data; 
        var returned = data.data;
      var Result = returned.replace("\"","");
      var rt = Result.replace("\"", "");
      var rt2 = rt.replace('"', "");       
          if (rt2.length >1){                   
            if (rt2 === "error") {
                reject("error");
            }else{
                console.log("resolved " + rt2);
                  resolve(rt2);                   
            }
          }        
      })
      .catch((error) => {           
      console.log('host 1 error: ' + error.error);
      var err = error.error;   
      if (err ==="The host could not be resolved"){
        console.log("hatupati host"); 
      }
       reject(err);
    })             
  })


}




Previous_trip(contents){
console.log('contents ' + contents);
return new Promise((resolve, reject) =>{        
  var Protocal = "22";
  var Content = this.stringToHex(contents);
  var MsgLens = Content.length;
  var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
  var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

        var MainURL = "https://api.gofer-errands.com/Jujus.svc/Riders_trips?Contents=" + Message2;
        var Searchurl = MainURL+ Message2;   
        console.log(Searchurl);
      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data; 
        var returned = data.data;
      var Result = returned.replace("\"","");
      var rt = Result.replace("\"", "");
      var rt2 = rt.replace('"', "");       
          if (rt2.length >1){                   
            if (rt2 === "error") {
                reject("error");
            }else{
                console.log("resolved " + rt2);
                  resolve(rt2);                   
            }
          }        
      })
      .catch((error) => {           
      console.log('host 1 error: ' + error.error);
      var err = error.error;   
      if (err ==="The host could not be resolved"){
        console.log("hatupati host"); 
      }
       reject(err);
    })             
  })


}


get_boda_trips(Cont){
  // console.log("cont" + Cont)
     return new Promise((resolve, reject) =>{              
           
       var Sending_conts = Cont
       var Protocal = "01";
       var Content = this.stringToHex(Sending_conts);
       var MsgLens = Content.length;
       var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
       var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;

      
       var MainURL = "https://api.gofer-errands.com/Jujus.svc/Current_trips?Contents=";   
       var Searchurl = MainURL+ Mes_to_send;
       console.log("Checking trips: " + Searchurl);
   
      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data;       
      //  console.log("Response" + Response)
        var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");
        
        var zote = rt2.split(";");
        var msg = zote[0]
             
            this.HextoString(rt2)
             .then((hexed) => {             
               var payload = hexed; 
                 resolve(payload);
                 console.log('payload.. ' + payload)  
             })    


          // resolve(msg);     
        // }
     
       })
       .catch((error) => {
        
         console.log('host 1 error: ' + error.error);
         var err = error.error;   
         if (err ==="The host could not be resolved"){
           console.log("hatupati host"); 
         }
         reject(err);
       })
     })
   
   }





}
