import { Component, OnInit } from '@angular/core';
import {  FormControl,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  LoginForm:FormGroup;

  constructor(private route:Router,private commonsrv:CommonService) { }
  get UserLoggedIn(){
    return this.commonsrv.UserLoggedIn;
  }
  get EmailV() {
    return this.LoginForm?.controls?.Email?.value;
  }
  get PasswordV() {
    return this.LoginForm?.controls?.Password?.value;
  }
  ngOnInit(): void {
    this.InitLogin();
  }
  InitLogin(){
  this.LoginForm=new FormGroup({
    Email :new FormControl('', [Validators.required, Validators.email]),
    Password:new FormControl('', Validators.required)
  });
  }
  
  Login(){
    if(this.LoginForm.valid){
        if (this.UserLoggedIn) {
          this.commonsrv.ShowMessage("User already logged in " + this.UserLoggedIn?.Email, 5000);
          return;
        }
      else if(
        this.commonsrv.UserPresent(this.EmailV)
      ){
        console.log('User Found');
        if (this.commonsrv.CheckPassword(this.EmailV, this.PasswordV)) {
          this.commonsrv.UpdateUserLog(this.commonsrv.GetUser(this.EmailV));
          console.log("logged In");
          this.commonsrv.ShowMessage("Logged in successfully", 3000);
          this.route.navigate(['/material']);
        } else {
          console.log("Password is incorrect");
          this.commonsrv.ShowMessage("Password is incorrect");
        }         
      }
    else{
      console.log("User Not found, Register");
      this.commonsrv.ShowMessage("User Not found,Please register");
    }
   }
  }

  RouteToRegister(){
    this.route.navigate(['/register']);
  }

}
