import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/shared/account.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  deslogar() {
    this.accountService.deslogar();
  }
}
