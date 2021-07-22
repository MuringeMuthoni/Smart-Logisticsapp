import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { WcfService } from '../wcf.service';

@Component({
  selector: 'app-pop-alert',
  templateUrl: './pop-alert.page.html',
  styleUrls: ['./pop-alert.page.scss'],
})
export class PopAlertPage implements OnInit {

  constructor(private Wcf:WcfService,
    private modalController: ModalController,
    private navParams: NavParams,private router:Router
    ) { }

    Header_msg = "Alert"
    Msg;
    modalTitle:string;
  ngOnInit() {

  }


  
  ionViewWillEnter(){
     var payload = this.navParams.data.paramTitle;
     var zote = payload.split("|")

     console.log('count is: ' + zote.length)

     if (zote.length>1){
      this.Msg = zote[0]
      this.Header_msg = zote[1]
     }else{
      this.Msg = this.navParams.data.paramTitle;
     }

    

   

   

  }



  async close(){

    var databack: string = "no data"; 
    await this.modalController.dismiss(databack);
   // this.router.navigate(['/proccessing']);   
  }



}

