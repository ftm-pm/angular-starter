import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileValidators } from '../shared/validators/file-validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public data: any[];
  public form: FormGroup;

  /**
   * Constructor DashboardComponent
   */
  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]],
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
  }
}

