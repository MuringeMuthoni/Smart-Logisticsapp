import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
})
export class FuelPage implements OnInit {
 
  usage={
    vehreg:'',
    fuellitres:'',
    fuelamount:'',
   
  }
  showlist:boolean=true;
  closelist:boolean=false;
  viewlistt:boolean=false;
  viewentry:boolean=true;
  vehreg
  Fuelreport;
  dataReturned
  constructor(private Loc: Location,private modalController:ModalController,
              private wcf:WcfService,private router:Router) { 
   }

  ngOnInit() {
     var tosend = this.wcf.User_id + ";7979"
    this.openModal(tosend)
  
  }
   showfuellist(){
     this.showlist = false;
     this.closelist = true;
     this.viewentry = false;
     this.viewlistt = true;

   }
   closefuellist(){
    this.showlist = true;
    this.closelist = false;
    this.viewentry = true;
    this.viewlistt = false;

  }
  go_home(){

    this.router.navigate(['/tabs']);    
   
  }
  
  
async openModal(idata) {

console.log( "this.pnamethis.Wcf.Contents idata " + idata)
const modal = await this.modalController.create({
  component: PopMessagesPage,
  swipeToClose: false,
  componentProps: {
    "paramID": 3,   //this for reaching the right function
    "paramTitle": idata,
   
   },
  cssClass: 'posting-popup',     
  backdropDismiss:false, 
  
});
modal.onDidDismiss().then((dataReturned) => {
  if (dataReturned !== null) {
    this.dataReturned = dataReturned.data;
    console.log("this.dataReturned: " + this.dataReturned);
      this.await(this.dataReturned);
    
  }
});

return await modal.present();
}




Regsfetched

await(data){
         this.Regsfetched = []
          

                  var splitvehregs= data.split("|");
            
                for(let i=0; i<splitvehregs.length; i++){  
                  if (splitvehregs.length>0) {                      
                      
                        var regs  = splitvehregs[i];
                       
                        if (regs != undefined || regs != ""){
                          if (regs !="none"){
                            this.Regsfetched.push({                               
                             regs:regs

                                          
                            });
                          
                        }
                      }
        
                  }
                }

            
 
  }
  vehregno;
  fuellitres;
  fuelamount;
  fuel_entry(){
    
    var changename  = this.usage['vehreg'];  
    var vehregno = changename.trim()
    console.log("vehreg;" + vehregno)
    if(vehregno.length<2) {        
      alert( "Sorry, your vehicle regno is invalid ") 
      return
    }
    this.vehreg = vehregno


    var fuellitres  = this.usage['fuellitres'];
    console.log(" fuellitres;" + fuellitres)
    if(fuellitres.length<2) {        
      alert( "Sorry, your fuel litres is invalid ") 
      return
    }
    this.fuellitres = fuellitres



    var fuelamount  = this.usage['fuelamount'];
    console.log(" fuelamount;" + fuelamount)
    if(fuelamount.length<2) {
      alert("Sorry, your fuel amount is invalid ") 
     
      return
    }
    this.fuelamount = fuelamount

    

    this.openMModal();

    this.wcf.Content_back =""
   
 
}
   
async openMModal() {    
      var data =   this.wcf.User_id + ";" + this.vehreg + ";" + this.fuellitres + ";" + this.fuelamount  + ";7979"

      console.log('data ' + data)
      const modal = await this.modalController.create({
        component: PopMessagesPage ,
        swipeToClose: false,
        componentProps: {
          "paramID": 4,   //this for reaching the right function
          "paramTitle": data,
          },
        cssClass: 'posting-popup',
        backdropDismiss:false,      
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          this.dataReturned = dataReturned.data;
          
          console.log("this.dataReturned" + this.dataReturned)
          var feedback = this.dataReturned;  
          console.log(feedback + "rtthis.dataReturned")   
          
          if (feedback.indexOf("Error") >= 0){       
              alert(this.wcf.Error_message);
          }else if (feedback.indexOf("Exists") >= 0){ 
              
                alert("Sorry but this data exist")
          }else if (feedback.indexOf("Success") >= 0){ 
          // this.userid=feedback;
             console.log("na save user DATA " + feedback)
             alert("Saved succesfully click View List to View")
             this.router.navigate(['/tabs']);   
          }else{
            alert(this.wcf.Error_message)         
          }
    
        }
      });
    
      return await modal.present();
}

gotoreports(){
  this.router.navigate(['/reportson-fuel']);    
}
 }
 

