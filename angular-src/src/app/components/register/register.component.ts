import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    //Required
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('fill in all fileds', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('worng email', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('Registered Success', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Registered Failed', { cssClass: 'alert-danger', timeout: 2000 });
        this.router.navigate(['/register']);
      }
    });
  }

}
