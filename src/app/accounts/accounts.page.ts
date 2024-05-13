import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SyncResult, reload, sync } from '@capacitor/live-updates';
import { AlertController, IonicModule } from '@ionic/angular';
import {
  ACCOUNT_TYPE_ORDER,
  Account,
  AccountType,
  AccountsService,
  COLORS,
} from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule, CommonModule],
})
export class AccountsPage implements OnInit {
  constructor(
    public readonly accountService: AccountsService,
    private readonly alertController: AlertController,
  ) {}

  ngOnInit(): void {
    sync().then((result: SyncResult) => {
      console.log(result);

      if (!result.activeApplicationPathChanged) {
        return;
      }

      this.alertController
        .create({
          header: 'Update Available',
          message:
            'There is an update available would you like to restart and install now?',
          buttons: [
            {
              text: 'YES',
              handler: () => reload(),
            },
            {
              text: 'CANCEL',
            },
          ],
        })
        .then((alert) => {
          return alert.present();
        });
    });
  }

  getAccountGroups(): Array<Account[]> {
    const allAccounts: Account[] = this.accountService.getAccounts();
    return ACCOUNT_TYPE_ORDER.map((accountType: AccountType) => {
      return allAccounts.filter(
        (account: Account) => account.type === accountType,
      );
    });
  }

  getAccountGroupColor(accountType: AccountType): string {
    return (
      COLORS.get(accountType) || (COLORS.get(AccountType.CHECKING) as string)
    );
  }

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
