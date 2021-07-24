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
          
     // var Sending_conts = Cont
      // var Protocal = this.Protocal;
      // var Content = this.stringToHex(Sending_conts);
      // var MsgLens = Content.length;
      // var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens); 
      // var Mes_to_send = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      //    var MainURL =url 
       var Searchurl = url+ Cont;
     console.log('linklink ' + Searchurl);
     
      this.http.get(Searchurl,{},{})
     .then((data) => {     
  
       Response = data.data;       
        var returned = data.data;       
       var Result = returned.replace("\"","");    
       var rt = Result.replace("\"", "");     
       var rt2 = rt.replace('"', "");    
     

       if  (rt2.indexOf('error') >= 0) {  
          resolve("error");      
        }else{       
           //this.HextoString(rt2)
            // .then((hexed) => {             
             //  var payload = hexed; 
                 resolve(rt2);
                 console.log('payload.. ' + rt2)  
           //  })    

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

 
    // public HextoString(hexed) {
    //   //console.log('hexing back');  
    //   return new Promise((resolve) =>{         
    //   try {
    //         var hex = hexed.toString();//force conversion
    //         var str = '';
    //         for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
    //             str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));          
          
    //       //console.log('hex back: '  +str);       
    //       resolve(str);  
             
        
    //   } catch (error) {
    //     console.log('error '  + error);  
    //   }
     
    //   })
    // }
    


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










}
