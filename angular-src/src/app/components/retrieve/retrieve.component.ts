import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  confrimPassword: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRetrieveSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      comfrimPassword: this.confrimPassword
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

    if (!this.validateService.validatePassword(user)) {
      this.flashMessagesService.show('两次输入的密码不一致', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    //retrieve password
    this.authService.retrievePassword(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('重置密码成功', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('重置密码失败', { cssClass: 'alert-danger', timeout: 2000 });
        this.router.navigate(['/register']);
      }
    })
  }

}
