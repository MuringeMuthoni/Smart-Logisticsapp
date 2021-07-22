import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
//import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import * as AES from 'crypto-js/aes';

@Injectable({
  providedIn: 'root'
})
export class WcfService {
   //editableproducts;
 // catpic;
  //plusdelivery;
  catpic
  Contentsids;
 // vendor_name
 enrollmentFname;
 enrollmentid; 
  projectname;
  enrollmentstatus;
  enrollmentamount;
  //enrollmentcontent;
  public Fetched_user: string;
  //Acctype ="sub";
  course_selected = "none"
  public where_from="none";
  public Contents;
  nowisconnected: boolean;
  //public Msgtosend;
  public unitSel;
  public unitID;
  public lessonid;
  public Content_back;
  public  user_log_status: string;
  Error_message ="Sorry, we have encoutered an unexpected error while processing the request"; 
  public Lastest_version;
  public update_type;
  public user_name = "none";
  public fireid = "none";
  public dbname: String ="db010";
  public reg_id = "0";
  Checkout_items;
  order_no;
  TotalCheckout;
  paymode;
  User_uphone;
  Checkout_id;
  Checkout_type;
  public ison=0; 
  //Username ="";
  public Count : number =0;
  //Password = "";
  public backurl="";
 // public Fetchedtel;
 // public Fetcheduseremail;
  //public fetchedpasswords;
 // public EmailFeedback;
 pay_status = "Pending"
 approval_status = "Pending"
 Regfee = 0
  public Userid;
  public Usermesso
   public colregno
   public regstage = "none";
   Fname ="none"
   regphone = "0"
   myphoto = "none";
   myid = "none";
   mycert = "none";
  constructor(private network: Network,private http: HTTP,private sqlite: SQLite,private router:Router) { }


  
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
save_success
payref
Startbit = "7878";
  Stopbit = "7979";
public Protocal = "01"
Mpesano
Log_usage(Cont){
  console.log("updating contLog_usage: " + Cont)
   // return new Promise((resolve, reject) =>{    
      var encrypted = AES.encrypt(Cont,'att@2020@').toString();            
      var Sending_conts = encrypted
      var Protocal = this.Protocal;
      var Content = this.stringToHex(Sending_conts);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
      var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      
      var MainURL = "https://api.netbizholdings.com/Jujus.svc/log_usage?Contents=";   
      var Searchurl = MainURL+ Mes_to_send;
      console.log('link ' + Searchurl);
     
      this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
        var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");    
    
       if  (rt2.indexOf('error') >= 0) {  
       //    resolve("error");      
        }else{       
           this.HextoString(rt2)
             .then((hexed) => {             
               var payload = hexed; 
              //   resolve(payload);
                 console.log('logged: ' + payload)  
             })    

        }
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
       // reject(err);
      //  resolve("error")
      })
   // })
  
  }




// public Comm_server(url){    
//   return new Promise((resolve) =>{     

//         console.log('linklink: ' + url);
//         this.http.get(url,{},{})       
//         .then((data) => {     
//           Response = data.data;       
//           var returned = data.data;
//           var Result = returned.replace("\"","");
//           var rt = Result.replace("\"", "");
//           var rt2 = rt.replace('"', "");    
//           console.log('databack: ' + rt2);

//             if  (rt2.indexOf('error') >= 0) {  
//               resolve("error");      
//             }else{  
//             resolve(rt2);        
//           }
        
//       })

//   })
//  }


 
 Token = "40M@22&5Mp.m@22*1B@30*"
 Server_connector_stream(url){
   console.log('stream.. ' + url)
    
   return new Promise((resolve, reject) =>{   

    if (this.network.type != 'none' ) {       
     
     var MainURL = "https://api-fixpal.netbizholdings.com/Jujus.svc/API_handshake";  
     this.http.get(MainURL, {}, {
       authorization: this.Token,
       cashe: 'no-cache',
       Conte: 'application/json;charset=UTF-8'       
     }).then((response) => {
         
           var  Auth = response.data  
           console.log('handshake: ' + Auth)

           if (Auth.length<3){
             this.router.navigate(['/connection-error']); 
             resolve("error");      
             return
           }

           if (Auth.indexOf('err') >= 0  || Auth.indexOf('no-token') >= 0  || Auth.indexOf('invalid') >= 0  ){                
             this.router.navigate(['/connection-error']); 
             resolve("error");      
             return
           }

           var Searchurl = url
           console.log('link ' + Searchurl);

           this.http.get(Searchurl, {}, {
             Token: Auth,
             cashe: 'no-cache',
             Conte: 'application/json;charset=UTF-8'
           }).then((data) => {

            var idata = data.data
            var Result = idata.replace("\"","");
            var rt = Result.replace("\"", "");
            var rt2 = rt.replace('"', "");    
             
               var sanitized = rt2.trim()
              // console.log('payloading.. ' + sanitized)   
             
               if  (sanitized.indexOf('error') >= 0) {  
                   resolve("error");      
                 }else{  
                   var payload = sanitized;
                  // console.log('payload.. ' + payload)   
                   resolve(payload)            
                 }
             
               })
               .catch((error) => {
               
                 console.log('host 1 error: ' + error.error);
                 var err = error.error;   
                 if (err ==="The host could not be resolved"){
                   console.log("hatupati host"); 
                 }
                 reject(err);
                 //resolve("error")
               })
             })
         .catch(response => {                  
           console.log('Authorization error: ' + response);

           this.router.navigate(['/connection-error']);               
           reject('error');
         })


     } else {
       console.log('Net not available '); 
       this.router.navigate(['/connection-error']); 
      
       reject('error');
     }    
 })
 
}


public request_auth(){
  console.log('checking auth')
  
  return new Promise((resolve, reject) =>{  

   
   if (this.network.type != 'none' ) {  
    
     var MainURL = "https://api-fixpal.netbizholdings.com/Jujus.svc/API_handshake";  
     this.http.get(MainURL, {}, {
       authorization: this.Token,
       cashe: 'no-cache',
       Conte: 'application/json;charset=UTF-8'
     }).then((response) => {
         var  Auth = response.data  
         console.log('handshake: ' + Auth)

         if (Auth.length<3){             
           this.nowisconnected = false;  
           resolve(this.nowisconnected)
           return
         }

         if (Auth.indexOf('err') >= 0  || Auth.indexOf('no-token') >= 0  || Auth.indexOf('invalid') >= 0  ){
           this.nowisconnected = false;             
         }else{
           this.nowisconnected = true; 
         }        
         resolve(this.nowisconnected)
     })
     .catch(response => {
       // prints 403
       console.log('Authorization error: ' + response.status);
       console.log('Authorization error: ' + response);
       reject("error")

       // prints Permission denied
       console.log(response.error);
     });
   }

})

  

}


refresh_local
keep_loging(idata){   
  var MainURL = "https://api-fixpal.netbizholdings.com/Jujus.svc/log_usage?Contents=" + idata  
  this.Server_connector_stream(MainURL) 
}



  

      
// Server_connector(Cont,url){
//    console.log("updating cont: " + Cont)
//     return new Promise((resolve, reject) =>{    
                            
//       var Sending_conts = Cont
//       var Protocal = this.Protocal;
//       var Content = this.stringToHex(Sending_conts);
//       var MsgLens = Content.length;
//       var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
//       var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
//      // console.log('msg_To_send ' + Mes_to_send);
//       var MainURL =url    // "https://api.netbizholdings.com/Jujus.svc/service_quotation_single?Contents=";   
//       var Searchurl = MainURL+ Mes_to_send;
//       console.log('link ' + Searchurl);
     
//       this.http.get(Searchurl,{},{})
//      .then((data) => {     
//        Response = data.data;       
//         var returned = data.data;
//        var Result = returned.replace("\"","");
//        var rt = Result.replace("\"", "");
//        var rt2 = rt.replace('"', "");    
    
//        if  (rt2.indexOf('error') >= 0) {  
//            resolve("error");      
//         }else{       
//            this.HextoString(rt2)
//              .then((hexed) => {             
//                var payload = hexed; 
//                  resolve(payload);
//                 // console.log('payload.. ' + payload)  
//              })    

//         }
    
//       })
//       .catch((error) => {
       
//         console.log('host 1 error: ' + error.error);
//         var err = error.error;   
//         if (err ==="The host could not be resolved"){
//           console.log("hatupati host"); 
//         }
//        // reject(err);
//         resolve("error")
//       })
//     })
  
//   }


       
// Server_connector_plain(Cont,url){
//   console.log("updating cont: " + Cont)
//    return new Promise((resolve, reject) =>{    
                           
    
//      var MainURL =url    // "https://api.netbizholdings.com/Jujus.svc/service_quotation_single?Contents=";   
//      var Searchurl = MainURL+ Cont;
//      console.log('link ' + Searchurl);
    
//      this.http.get(Searchurl,{},{})
//     .then((data) => {     
//       Response = data.data;       
//        var returned = data.data;
//       var Result = returned.replace("\"","");
//       var rt = Result.replace("\"", "");
//       var rt2 = rt.replace('"', "");    
   
//       if  (rt2.indexOf('error') >= 0) {  
//           resolve("error");      
//        }else{  
//         resolve(rt2);        
//        }
   
//      })
//      .catch((error) => {
      
//        console.log('host 1 error: ' + error.error);
//        var err = error.error;   
//        if (err ==="The host could not be resolved"){
//          console.log("hatupati host"); 
//        }
//       // reject(err);
//        resolve("error")
//      })
//    })
 
//  }





    
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
  
  save_user_Data(idata) {
    this.Count = 0;
    this.sqlite.create({
      name: "" + this.dbname,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      //console.log('saving data now ' + this.Fetched_user + ',' + idata  + ','+ this.Acctype );
      db.executeSql('INSERT INTO users VALUES(NULL,?,?,?)',[this.Fetched_user,'std',idata ])
     
        .then(res => {
          //console.log('saved data now ' + this.data.coluser + ' , type: ' + this.Acctype );    
          this.Count=1;  
        
        })
        .catch(e => {
          console.log('error 1 is: ' + e);         
        });
  
    }).catch(e => {
      console.log('error 3 is: ' + e);         
    });
    
    
  }
  get_trips_asynch(idata){
    return new Promise((resolve, reject) =>{  

      //do your thing here
      

     })
  }
}