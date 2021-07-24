import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {

  usage={
    vehreg:'',
    entrydate:'',
    description:'',
    expamo:'',
   
  }
  showlist:boolean=true;
  closelist:boolean=false;
  viewlistt:boolean=false;
  viewentry:boolean=true;
  vehreg
  Fuelreport
  constructor(private Loc: Location,private modalController:ModalController,
    private wcf:WcfService,private router:Router, private datepipe:DatePipe) { 
}
dataReturned
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
    entrydate;
    vehregno;
    description;
    expamo;
    schedule_entry(){
      var entrydate  = this.usage['entrydate'];
      console.log("entrydate;" + entrydate)
      if(entrydate.length<2) {   
        alert( "Sorry, the entry date  is invalid") 
        return
      }
      this.entrydate = entrydate
  
  
      var changename  = this.usage['vehreg'];  
      var vehregno = changename.trim()
      console.log("vehreg;" + vehregno)
      if(vehregno.length<2) {        
        alert( "Sorry, your vehicle regno is invalid ") 
        return
      }
      this.vehreg = vehregno
  
  
      var description  = this.usage['description'];
      console.log(" description;" + description)
      if(description.length<2) {        
        alert( "Sorry, your description is invalid ") 
        return
      }
      this.description = description
        
  
      this.openMModal();
  
      this.wcf.Content_back =""
     
   
  }
     
  async openMModal() {    
    var siku  = this.usage['entrydate'];
    let latest_date =this.datepipe.transform(siku, 'yyyy-MM-dd');
        var data =   this.wcf.User_id + ";" + latest_date + ";" + this.vehreg  + ";" + this.description  + ";7979"
  
        console.log('data ' + data)
        const modal = await this.modalController.create({
          component: PopMessagesPage ,
          swipeToClose: false,
          componentProps: {
            "paramID": 6,   //this for reaching the right function
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
            console.log(feedback + "expethis.dataReturned")   
            
            if (feedback.indexOf("Error") >= 0){       
                alert(this.wcf.Error_message);
            }else if (feedback.indexOf("Exists") >= 0){ 
                
                  alert("Sorry but this data exist")
            }else if (feedback.indexOf("Success") >= 0){ 
            // this.userid=feedback;
               console.log("na save expe DATA " + feedback)
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
    this.router.navigate(['/reportson-schedules']);    
  }

}
