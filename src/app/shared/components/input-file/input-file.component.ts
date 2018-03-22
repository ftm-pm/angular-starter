import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

import { FileInput } from './file-input';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: InputFileComponent }
  ]
})
export class InputFileComponent implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy {
  private static nextId: number = 0;
  public stateChanges: Subject<void> = new Subject<void>();
  public focused: boolean = false;
  public controlType: string = 'file-input';

  private _placeholder: string;
  private _required: boolean = false;

  @Input() public valuePlaceholder: string;
  @Input() public multiple: boolean;

  @HostBinding() public id: string = `app-input-file-${InputFileComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') public describedBy: string = '';

  /**
   * @see https://angular.io/api/forms/ControlValueAccessor
   */
  public constructor(public ngControl: NgControl,
              private focusMonitor: FocusMonitor, private _elementRef: ElementRef, private _renderer: Renderer2) {

    ngControl.valueAccessor = this;
    focusMonitor.monitor(_elementRef.nativeElement, _renderer, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.multiple = coerceBooleanProperty(this.multiple);
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  @Input() get value(): FileInput | null {
    return this.empty ? null : new FileInput(this._elementRef.nativeElement.value || []);
  }

  set value(fileInput: FileInput | null) {
    this.writeValue(fileInput.files);
    this.stateChanges.next();
  }

  @Input() get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty() {
    return !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0;
  }

  @Input() get required(): boolean {
    return this._required;
  }

  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input() get disabled() {
    return this._elementRef.nativeElement.disabled;
  }

  set disabled(dis: boolean) {
    this.setDisabledState( coerceBooleanProperty(dis));
    this.stateChanges.next();
  }

  @HostBinding('class.file-input-disabled') get isDisabled() {
    return this.disabled;
  }
  @HostBinding('class.mat-form-field-should-float') get shouldPlaceholderFloat() {
    return this.focused || !this.empty || this.valuePlaceholder !== undefined;
  }

  @Input() get errorState() {
    return this.ngControl.errors !== null && this.ngControl.touched;
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this._elementRef.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  public writeValue(obj: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', obj);
  }

  public registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  @HostListener('change', ['$event']) public change(event) {
    const fileList = event.target.files;
    const fileArray = [];
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i]);
      }
    }
    this.value = new FileInput(fileArray);
    this._onChange(this.value);
  }

  @HostListener('focusout') public blur() {
    this.focused = false;
    this._onTouched();
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  public open(): void {
    if (!this.disabled) {
      this._elementRef.nativeElement.querySelector('input').click();
    }
  }

  get fileNames() {
    return this.value ? this.value.fileNames : this.valuePlaceholder;
  }

}
