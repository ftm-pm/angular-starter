import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="openMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
