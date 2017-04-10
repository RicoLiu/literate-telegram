import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data)
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('success login', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000});
        this.router.navigate(['login']);
      }

    })
  }
}
