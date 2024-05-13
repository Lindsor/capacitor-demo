import { Injectable } from '@angular/core';

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  HELOC = 'HELOC',
}

export const COLORS: Map<AccountType, string> = new Map([
  [AccountType.CHECKING, '--ion-color-secondary'],
  [AccountType.SAVINGS, '--ion-color-success'],
  [AccountType.HELOC, '--ion-color-warning'],
]);

export const ACCOUNT_TYPE_ORDER: AccountType[] = [
  AccountType.CHECKING,
  AccountType.SAVINGS,
  AccountType.HELOC,
];

export interface Account {
  id: string;
  number: string;
  balance: number;
  name: string;
  type: AccountType;
}

const getNextId: () => number = (() => {
  let nextId = 1;
  return () => nextId++;
})();

const ACCOUNTS: Account[] = [
  {
    id: `${getNextId()}`,
    number: '********3617',
    balance: 5000.45,
    name: 'Everyday Savings',
    type: AccountType.SAVINGS,
  },
  {
    id: `${getNextId()}`,
    number: '********5439',
    balance: 10_065_345.23,
    name: 'Everyday Checking',
    type: AccountType.CHECKING,
  },
  {
    id: `${getNextId()}`,
    number: '********9401',
    balance: 4006.5,
    name: 'Personal Checking',
    type: AccountType.CHECKING,
  },
  {
    id: `${getNextId()}`,
    number: '********7247',
    balance: 783.5,
    name: 'Savings Builder',
    type: AccountType.SAVINGS,
  },
  {
    id: `${getNextId()}`,
    number: '********1954',
    balance: 1245.5,
    name: 'Home Equity Line of Credit',
    type: AccountType.HELOC,
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
