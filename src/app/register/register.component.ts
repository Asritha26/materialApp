import { Component, OnInit } from '@angular/core';
import {  FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm:FormGroup
  constructor(private commonsrv:CommonService,private route:Router) { }

  ngOnInit(): void {
    this.InitRegister();
    this.UserValidation();
  }
  InitRegister(){
    this.RegisterForm=new FormGroup({
      FirstName: new FormControl('',Validators.required),
      LastName: new FormControl(''),
      Email: new FormControl('',[Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      ConfirmPassword: new FormControl('',Validators.required),
      Phone: new FormControl(''),
      Address: new FormControl(''),
      Pincode: new FormControl('')
    });
    
  }
  Register(){
    if(this.RegisterForm.valid){
      this.commonsrv.AddUser(this.RegisterForm.value);
    }
    this.route.navigate(['/login']);
  }

  BackToMain(){
    this.route.navigate(['/material']);
  }

  UserValidation(){
    this.RegisterForm?.controls?.Email?.valueChanges.subscribe(v => {
      if (this.commonsrv.UserPresent(v)) {
       console.log('Email Already Exist !!!', v);
        this.RegisterForm?.controls?.Email?.setErrors({userPresent: true});
      } 
      else {
        this.RegisterForm?.controls?.Email?.setErrors(null);
      }
    });
    this.RegisterForm?.controls?.ConfirmPassword?.valueChanges.subscribe(v => {
      if (this.RegisterForm?.controls?.Password?.value === v) {
        this.RegisterForm?.controls?.ConfirmPassword?.setErrors(null);
      }
      else {        
        this.RegisterForm?.controls?.ConfirmPassword?.setErrors({notsame: true});
      }
    })
  }

}
