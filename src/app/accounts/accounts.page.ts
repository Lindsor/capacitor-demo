import { AccountsService } from './accounts.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule, CommonModule],
})
export class AccountsPage {
  constructor(public readonly accountService: AccountsService) {}

  transferTo(
    fromAccountId: string,
    toAccountId: string,
    amount: number | string,
    modal: HTMLIonModalElement,
  ): void {
    if (
      this.accountService.transferMoney(
        fromAccountId,
        toAccountId,
        Number(amount),
      )
    ) {
      modal.dismiss();
    } else {
    }
  }
}
