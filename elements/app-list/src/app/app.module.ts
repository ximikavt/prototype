import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppListComponent } from './app-list.component';
import { createCustomElement } from '@angular/elements';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, MatButtonModule],
    declarations: [AppComponent, AppListComponent],
    bootstrap: environment.production ? [] : [AppComponent],
    exports: [AppListComponent]
})
export class AppModule {
    constructor(private readonly injector: Injector) {
    }

    public ngDoBootstrap() {
        const appListElement = createCustomElement(AppListComponent, { injector: this.injector });
        customElements.define('element-app-list', appListElement);
    }
}

