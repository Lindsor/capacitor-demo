import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, RouterModule, CommonModule],
})
export class HomePage {
  public error: string | null = null;

  public form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {}

  submit() {
    if (this.form.invalid) {
      this.error = 'Please input valid credentials';
      return;
    }

    this.error = null;

    if (
      this.form.get('username')?.value !== 'batman' ||
      this.form.get('password')?.value !== 'Test!234'
    ) {
      this.error = 'The credentials are invalid';
      return;
    }

    this.router.navigate(['accounts']);
  }
}
