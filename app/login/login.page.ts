import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usage={
    txtuser:'',
    txtphone:'',
    password:'',
  }
  constructor(private router: Router,) { }

  ngOnInit() {
  }
  isTextFieldType: boolean;
  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  registration()
{
  this.router.navigate(['/registration']); 
}
gotodashboard()
{
  this.router.navigate(['/tabs']); 
  console.log("tabs")
}
}
