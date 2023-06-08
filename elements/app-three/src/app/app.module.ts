import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { AppThreeComponent } from './app-three.component';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule],
    declarations: [AppComponent, AppThreeComponent],
    exports: [AppThreeComponent]
})
export class AppModule {
    constructor(private readonly injector: Injector) {
    }

    public ngDoBootstrap() {
        const appThreeElement = createCustomElement(AppThreeComponent, { injector: this.injector });
        customElements.define('element-app-three', appThreeElement);
    }
}

