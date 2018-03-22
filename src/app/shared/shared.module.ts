import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ImageWidgetComponent } from './components/image-widget/image-widget.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

const SHARED_COMPONENTS = [
  ImageWidgetComponent,
  InputFileComponent
];
const SHARED_PIPES = [
  ByteFormatPipe
];
const SHARED_SERVICES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ]
})
export class SharedModule {
  /**
   * @returns {ModuleWithProviders}
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:  [
        ...SHARED_SERVICES
      ]
    };
  }
}
