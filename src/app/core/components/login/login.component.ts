import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ErrorStateMatcher } from '../../matchers/error-state.matcher';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public matcher: ErrorStateMatcher;
  public error: boolean;
  public submitted: boolean;

  private subscription: Subscription;

  /**
   * Constructor LoginComponent
   *
   * @param {FormBuilder} fb
   * @param {AuthService} authService
   * @param {Router} router
   */
  public constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.matcher = new ErrorStateMatcher();
    this.subscription = new Subscription();
    this.error = false;
    this.submitted = false;
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.subscription.add(this.authService.getAuthenticated().subscribe(logged => {
      if (logged) {
        this.router.navigate(['/']);
      }
    }));
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Submit form
   *
   * @param formValue
   * @param event
   */
  public onSubmit(formValue, event: MouseEvent) {
    if (this.form.valid) {
      this.error = false;
      this.submitted = true;
      this.subscription.add(this.authService.login(formValue)
        .subscribe(response => {
          this.submitted = false;
        }, error => {
          this.error = true;
          this.submitted = false;
        })
      );
    }
  }
}
