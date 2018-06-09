import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { FileValidators } from '../shared/validators/file-validators';
import { ImageWidgetOptions } from '../shared/components/image-widget/image-widget.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public data: any[];
  public form: FormGroup;
  public options: ImageWidgetOptions;
  /**
   * Constructor DashboardComponent
   */
  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]],
    });
    this.options = <ImageWidgetOptions>{
      disabled: false,
      showPreview: true,
      multiple: true
    };
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

