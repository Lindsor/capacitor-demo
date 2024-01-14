import { AccountsService } from './accounts.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { sync, reload, SyncResult } from '@capacitor/live-updates';

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
