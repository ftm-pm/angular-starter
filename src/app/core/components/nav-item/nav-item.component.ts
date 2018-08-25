import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()">
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [
      `
      .secondary {
        color: rgba(0, 0, 0, 0.54);
      }
    `
  ]
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | (string | number)[] = '/';
  @Output() navigate = new EventEmitter();
}
