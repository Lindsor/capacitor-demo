import { Injectable } from '@angular/core';

export interface Account {
  id: string;
  number: string;
  balance: number;
  name: string;
}

const ACCOUNTS: Account[] = [
  {
    id: Math.random().toString().slice(2),
    number: '********5439',
    balance: 100.65,
    name: 'Everyday Checking',
  },
  {
    id: Math.random().toString().slice(2),
    number: '********3617',
    balance: 5000.45,
    name: 'Everyday Savings',
  },
  {
    id: Math.random().toString().slice(2),
    number: '********9401',
    balance: 400.5,
    name: 'Personal Checking',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accounts: typeof ACCOUNTS = JSON.parse(JSON.stringify(ACCOUNTS));

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(accountId: string): Account {
    return this.accounts.find((a) => a.id === accountId) as Account;
  }

  transferMoney(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ): boolean {
    const fromAccount: Account | undefined = this.accounts.find(
      (a) => a.id === fromAccountId,
    );
    const toAccount: Account | undefined = this.accounts.find(
      (a) => a.id === toAccountId,
    );

    if (!fromAccount || !toAccount) {
      return false;
    }

    fromAccount.balance = fromAccount.balance - amount;
    toAccount.balance = toAccount.balance + amount;

    this.refreshAccounts();
    return true;
  }

  private refreshAccounts(): void {
    this.accounts = JSON.parse(JSON.stringify(this.accounts));
  }
}
