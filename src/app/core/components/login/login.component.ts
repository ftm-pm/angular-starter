import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ErrorStateMatcher } from '../../matchers/error-state.matcher';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public form: FormGroup;
  public matcher: ErrorStateMatcher;
  public error: boolean;

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
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.subscription.add(this.authService.getAuthenticated().subscribe(logged => {
      if(logged) {
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
      this.subscription.add(this.authService.login(formValue).subscribe(response => {
          console.log('auth');
        }, error => {
          this.error = true;
        })
      );
    }
  }
}
