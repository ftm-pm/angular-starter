import { InjectionToken } from '@angular/core';

export const AppStorage: InjectionToken<Storage> = new InjectionToken<Storage>('AppStorage');
export * from './browser.storage';
export * from './server.storage';
