import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  UserData: any[]=[];
  UserLoggedIn;

  constructor(private toast: MatSnackBar) { 
    if (sessionStorage.getItem('Users')) {
      this.UserData = JSON.parse(sessionStorage.getItem('Users'));
    }
    if (sessionStorage.getItem('UserLoggedIn')) {
      this.UserLoggedIn = JSON.parse(sessionStorage.getItem('UserLoggedIn'));
    }
  }

 AddUser(data){
    this.UserData.push(data);
    this.AddToDB();
    this.ShowMessage('Added '+data.Email+' successfully!', 5000);
    this.display();
    return true;
 }
 UserPresent(email){
   return this.UserData.find(u =>u.Email===email);
 }
 CheckPassword(email, password){
  console.log(email, password);
  const user = this.GetUser(email);
  return user.Password === password;
}
 GetUser(email){
  return this.UserData.find(u => u.Email===email)
}
UpdateUserLog(user) {
 this.UserLoggedIn = user;
 sessionStorage.setItem('this.UserLoggedIn', JSON.stringify(this.UserLoggedIn));
}
AddToDB() {
  sessionStorage.setItem('Users', JSON.stringify(this.UserData));
}
 display(){
   console.log(this.UserData);
 }

 ShowMessage(message, duration?) {
  this.toast.open(message, 'OK', {
    verticalPosition: 'top',
    duration: duration || 3000
  });
 }
 
}
