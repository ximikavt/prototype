import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [AppComponent]
})
export class AppModule {
    constructor(private readonly injector: Injector) {
    }

    public ngDoBootstrap() {
        const customElement = createCustomElement(AppComponent, { injector: this.injector });
        customElements.define('element-app-nested-one', customElement);
    }
}
