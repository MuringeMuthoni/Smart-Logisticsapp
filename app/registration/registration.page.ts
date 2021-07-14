import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  usage={
    fullname:'',   
    phonenumber:'',
    emailname:'',
  
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }
  isTextFieldType: boolean;
  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  login()
{
  this.router.navigate(['/login']); 
}
}
