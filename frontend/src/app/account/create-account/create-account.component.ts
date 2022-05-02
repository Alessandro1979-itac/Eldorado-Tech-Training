import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../shared/account.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  account = {
    email: '',
    password: '',
  };

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const result = await this.accountService.createAccount(this.account);
      console.log(
        this.alertService.success(
          '',
          `User: ${this.account.email} created successfully!`,
          'Ok'
        )
      );
      this.router.navigate(['']);
    } catch (error) {
      console.error(
        this.alertService.error(
          '',
          `Email: ${this.account.email} already exists, try another email!`,
          'Ok'
        )
      );
    }
  }
}
