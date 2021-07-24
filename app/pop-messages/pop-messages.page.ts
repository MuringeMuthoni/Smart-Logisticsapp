import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import { DatePipe } from '@angular/common';
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

  constructor(
    private modalController: ModalController, public Wcf: WcfService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    
  }

  Content;
  ionViewWillEnter(){
    this.msg_names = "Posting data. Please wait" 
    

   this.modelId = this.navParams.data.paramID;
   this.Content = this.navParams.data.paramTitle;

   console.log('content: ' + this.Content + ' await: ' + this.modelId)
  
  if (this.modelId == 0){

    var MainURL = "https://api.logistics.co.ke/Jujus.svc/Client_Connection?Contents=";          
   // var encrypted = AES.encrypt(this.Content,'att@2020@').toString(); 
    this.Wcf.Contents =  this.Content + "|" + MainURL;
    this.Wcf.Serverconnector(MainURL, this.Content) 
    .then((data:string) => { 
      this.proceed(data)
    })


  }else if (this.modelId == 1){   
    var MainURL = "https://api.logistics.co.ke/Jujus.svc/Create_account?Contents=";          
    var encrypted = AES.encrypt(this.Content,'att@2020@').toString(); 
    this.Wcf.Contents =  encrypted + "|" + MainURL;
   // this.Comm_server();

   
  }else{
    this.msg_names = "MODE ID NOT SET ON POPUP"
    alert('MODE ID NOT SET ON POPUP ' + this.modelId)
   }


  }

//   protocal="01";
//   divclose:boolean=false;
//   divspinner:boolean=true;
//   public Comm_server(){    
//     return new Promise((resolve) =>{     

//           var datazote =this.Wcf.Contents.split("|");
        
//           var data = datazote[0] 
//           var MainURL = datazote[1]  

//           console.log('datazoteMainURL: ' + datazote )
                
//          var authenticated = 

//           resolve(authenticated)
//           console.log('datazotedata: ' + authenticated  )       
//     });
   

// }



async proceed(idata:string){
 // this.Wcf.Content_back =idata;
//console.log('closing modal ' + this.Wcf.Content_back)
 var databack: string = idata; 
  await this.modalController.dismiss(databack);

}

closeModal(){
   this.modalController.dismiss('None');
}


}
