import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})

export class MaterialComponent implements OnInit {

  constructor(private commonsrv:CommonService,private route:Router) { }

  ngOnInit(): void {
    if (!this.UserLoggedIn) {
      this.RouteToLogin();
    }
  }
  get UserLoggedIn(){
    return this.commonsrv.UserLoggedIn;
  }
  Logout() {
    if (this.UserLoggedIn) {
      console.log("User Logged Out")
      this.commonsrv.UpdateUserLog(null);
      this.route.navigate(['/login']);
    }

  }
  RouteToLogin(){
    this.route.navigate(['/login']);
  }
  RouteToRegister(){
    this.route.navigate(['/register']);
  }
  

}
