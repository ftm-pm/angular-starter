import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { ImageService } from '../../../core/services/image.service';
import { FileInput } from '../input-file/file-input';
import { Image } from '../../../core/entities/image';

export interface ImageWidgetOptions {
  showPreview ?: boolean;
  src ?: string;
  disabled ?: boolean;
  required ?: boolean;
  multiple ?: boolean;
  validators ?: any[];
  placeholder ?: string;
  valuePlaceholder ?: string;
}

@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() public options: ImageWidgetOptions = <ImageWidgetOptions>{
    disabled: false,
    required: false,
    multiple: false,
    showPreview: false,
    validators: [Validators.required]
  };
  @Input() public formControl: FormControl;
  public imageFormControl: FormControl;
  @Output() public error: EventEmitter<any>;
  @Output() public success: EventEmitter<any>;
  public submitted: boolean;
  public form: FormGroup;
  public files: Subject<File[]>;

  /**
   * @param {ImageService} imageService
   */
  public constructor(private imageService: ImageService) {
    this.subscription = new Subscription();
    this.error = new EventEmitter<any>();
    this.success  = new EventEmitter<any>();
    this.submitted = false;
    this.files = new Subject<File[]>();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    if (this.options.disabled === undefined) {
      this.options.disabled = false;
    }
    if (!this.options.validators) {
      this.options.validators = [Validators.required];
    }
    this.imageFormControl = new FormControl({ value: undefined, disabled: this.options.disabled }, this.options.validators);
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * On change files
   *
   * @param {Event} event
   */
  public onChange(event: Event): void {
    const fileInput: FileInput = this.imageFormControl.value;
    this.send(fileInput.files);
  }

  /**
   * Send form and save data
   *
   * @param {File[]} files
   */
  private send(files: File[]): void {
    const observables: Observable<Image>[] = files.map((file: File) => {
      const formData: FormData = new FormData();
      formData.append('imageFile', file, file.name);
      return this.imageService.postData(formData);
    });
    this.submitted = true;
    this.subscription.add(Observable.combineLatest(observables)
      .subscribe( (response: any[]) => {
        this.submitted = false;
        if (response && this.formControl) {
          this.update(response);
        } else {
          console.error('response or formControl is null');
        }
      }, error => {
        this.submitted = false;
      })
    );
  }

  /**
   *
   */
  private update(data: any[]): void {
    if (this.options.multiple) {
      this.formControl.setValue(data);
    } else {
      this.formControl.setValue(data[0]);
    }
  }
}
