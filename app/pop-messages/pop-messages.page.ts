import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MyDbService } from '../my-db.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';
import { WcfService } from '../wcf.service';

@Component({
  selector: 'app-pop-messages',
  templateUrl: './pop-messages.page.html',
  styleUrls: ['./pop-messages.page.scss'],
})
export class PopMessagesPage implements OnInit {
  msg_names;
  modalTitle:string;
  modelId:number;
  Contents;
  divclose:boolean=false;
  divspinner:boolean=true;
  constructor(private modalController: ModalController, public Wcf: WcfService,public mydb:MyDbService,
    private navParams: NavParams,private network: Network,private http: HTTP
    ) { }

    ngOnInit() {
      this.Contents = this.navParams.data.paramTitle;
      console.log("POpMessage Init: " +  this.Contents)
    }
        
    ionViewWillEnter(){
      this.msg_names = "Checking connection...";
      this.check_connection();

    }

    checknet;
    check_connection(){        
      this.Wcf.try_connect()
      .then((data)=>{                           
            if (data == true){           
            
              clearInterval(this.checknet);  
              this.Proceeding(); 
                       
            }else{
              //this.msg_names = "No connection to internet, retrying...";
              this.No_connection_error();
              if (this.checknet == null){
                this.checknet = setInterval(()=> { this.check_connection() }, 1000); 
              }                     
            }
      });
    }
  
  
    No_connection_error(){
      alert('We are having trouble connecting to internet')
      this.modalController.dismiss(this.Wcf.Content_back);
    }


    Proceeding(){
    
      this.modelId = this.navParams.data.paramID;
       console.log('message mode: ' + this.navParams);
   
      if (this.modelId == 0){  
           var conts = this.Contents
           var MainURL = "https://api.logistics.co.ke/Jujus.svc/Client_Connection?Contents=" + conts         
           this.Wcf.Server_connector_stream(MainURL)
           .then((data: string)=>{
             this.proceed(data);
            })
            
          } else if (this.modelId ==1){
            var conts = this.Contents
            var MainURL = "https://api.logistics.co.ke/Jujus.svc/Create_account?Contents=" + conts  
            this.Wcf.Server_connector_stream(MainURL)
            .then((data: string)=>{
              this.proceed(data);
             })

          }else{
            alert('param not set');
            this.proceed('not');
          }
   
     }

        
    async proceed(idata){
      this.Wcf.Content_back =idata;
      console.log('closing modal ' + this.Wcf.Content_back)
      await this.modalController.dismiss(this.Wcf.Content_back);

    }






}