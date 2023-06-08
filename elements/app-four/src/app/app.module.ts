import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { environment } from '../environments/environment';
import { AppFourComponent } from './app-four.component';
import { PivotGridModule } from './pivot-grid/pivot-grid.module';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, PivotGridModule],
    declarations: [AppComponent, AppFourComponent],
    bootstrap: environment.production ? [] : [AppComponent],
    exports: [AppFourComponent]
})
export class AppModule {
    constructor(private readonly injector: Injector) {
    }

    public ngDoBootstrap() {
        const appFourElement = createCustomElement(AppFourComponent, { injector: this.injector });
        customElements.define('element-app-four', appFourElement);
    }
}

