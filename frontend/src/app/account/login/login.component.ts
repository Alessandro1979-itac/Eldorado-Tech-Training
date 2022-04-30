import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../shared/account.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    password: '',
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate(['']);
    } catch (error) {
      console.error(
        this.alertService.error('', 'Usuário ou senha incorreto(s)!', 'Ok')
      );
    }
  }
}
