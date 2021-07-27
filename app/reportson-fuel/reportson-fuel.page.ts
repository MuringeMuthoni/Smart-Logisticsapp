import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopMessagesPage } from '../pop-messages/pop-messages.page';
import { WcfService } from '../wcf.service';
import { Location } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-reportson-fuel',
  templateUrl: './reportson-fuel.page.html',
  styleUrls: ['./reportson-fuel.page.scss'],
})
export class ReportsonFuelPage implements OnInit {


  items_ziko:boolean=false;
  no_items_found:boolean=false;
  no_items_found_new:boolean=false
  items_ziko_new:boolean=false
  constructor(private wcf:WcfService, private modalController:ModalController,
    private dom: DomSanitizer,private Loc: Location,
    private router:Router,) {

   }

   dataReturned
  ngOnInit() {
 
    // console.log('lesson ' +  this.course)
     var tosend = this.wcf.User_id + ";7979"
     this.openModal(tosend)
  }

  divlive:boolean=false
  items=""
 
async openModal(idata) {

console.log( "this.pnamethis.Wcf.Contents idata " + idata)
const modal = await this.modalController.create({
  component: PopMessagesPage ,
  swipeToClose: false,
  componentProps: {
    "paramID": 9,   //this for reaching the right function
    "paramTitle": idata,
   
   },
  cssClass: 'posting-popup',     
  backdropDismiss:false, 
  
});
modal.onDidDismiss().then((dataReturned) => {
  if (dataReturned !== null) {
    this.dataReturned = dataReturned.data;
    console.log("this.dataReturned: " + this.dataReturned);
   // this.products = []

    
   // this.fb.logEvent(this.fb.EVENTS.EVENT_PARAM_SEARCH_STRING)
   // this.fb.logEvent(this.fb.EVENTS.EVENT_PARAM_SEARCH_STRING,this.pname,0)


    if (this.dataReturned == ""){
      this.no_items_found=true;
      this.items_ziko=false
      this.no_items_found_new =true;
      this.items_ziko_new = false
      this.items = ""
    }else{
      this.no_items_found=false;
      this.items_ziko=true
      this.no_items_found_new =false;
      this.items_ziko_new = true
      this.await(this.dataReturned);
    }
   
    
  }
});

return await modal.present();
}


Assignmentsfetch
itempast
await(data){
  this.Assignmentsfetch = [];
  
  var cats = data;
  console.log('my categories:' +data)
 
  var zote = data.split("*")
  var ongoingclasses = zote[0]
  console.log('my categories ongoingclasses:' +ongoingclasses)
  var pastclasses = zote[1]


           if  (ongoingclasses.indexOf('none') >= 0) {
            this.items_ziko_new = false
            this.no_items_found_new = true

           }else{ 

            this.items_ziko_new = true
            this.no_items_found_new = false

                  var splitongoingclasses = ongoingclasses.split("|");
            
                for(let i=0; i<splitongoingclasses.length; i++){  
                  if (splitongoingclasses.length>0) {                      
                        var catall = splitongoingclasses[i].split(";"); 
                        console.log('cat:' +catall)
        
                        var oids  = catall[0];
                        var oCoursename  = catall[1];
                        var oclassdetails  = catall[2];
                        var otutor   = catall[3];
                        var ovids_url    = catall[4];
                        var oetime    = catall[5];
                        var image_ipath    = catall[6];

                        if (oids != undefined || oids != ""){
                          if (oids !="none"){
                            this.Assignmentsfetch.push({                               
                              oid:oids,
                              oCoursename: oCoursename,                     
                              oclassdetails: oclassdetails,   
                              otutor:otutor,
                              ovids_url: ovids_url,                     
                              oetime: oetime, 
                              image_ipath:'https://elearning.shangtao.ac.ke/src/images/shang/units/' + image_ipath,


                                          
                            });
                            //console.log('img: ' + 'https://b2b.netbizholdings.com/images/Categories_images/'+Icon_path)
                        }
                      }
        
                  }
                }

              }
 
 
       if  (pastclasses.indexOf('none') >= 0) {
             this.items_ziko = false
              this.no_items_found = true
    
         }else{ 
          this.items_ziko = true
          this.no_items_found = false

            this.itempast = []
            console.log('past classes:' +pastclasses)

            var splitpast = pastclasses.split("|");
            for(let i=0; i<splitpast.length; i++){           
    
            var checkdata = splitpast[i]
            if (checkdata == undefined){
              return
            }   
    
              var pastalls = splitpast[i].split(";");   
              console.log('pros:' +pastalls)   
                              
                if (pastalls.length>1) { 
                  
                    var pids = pastalls[0];
                    var pCoursename = pastalls[1];                  
                    var pclassdetails = pastalls[2];
                    var ptutor  = pastalls[3];  
                    var pvids_url  = pastalls[4];                  
                    var petime  = pastalls[5];
                    var image_ipath = pastalls[6]; 
                  
    
                    
    
                    if (pids != undefined || pids != ""){
                      this.itempast.push({
                        oid:oids,
                        oCoursename: pCoursename,                     
                        oclassdetails: pclassdetails,   
                        otutor:ptutor,
                        ovids_url: pvids_url,                     
                        oetime: petime, 
                        image_ipath:'https://elearning.shangtao.ac.ke/src/images/shang/units/' + image_ipath,

                      });
                      // console.log('pname: ' +pname )
                  }
    
                    // console.log('pros: ' +proIcons2 )
                }  
            }
          }
 }
}
