import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'

import { ValidateService } from '../../services/validate.service';


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
    private flashMessagesService: FlashMessagesService
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
  }

}
