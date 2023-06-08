import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { environment } from '../environments/environment';
import { AppOneComponent } from './app-one.component';
import { AppOneAlternativeComponent } from './app-one-alternative/app-one-alternative.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent, AppOneComponent, AppOneAlternativeComponent],
    bootstrap: environment.production ? [] : [AppComponent],
    exports: [AppOneComponent, AppOneAlternativeComponent]
})
export class AppModule {
    constructor(private readonly injector: Injector) {
    }

    public ngDoBootstrap() {
        const appOneElement = createCustomElement(AppOneComponent, { injector: this.injector });
        customElements.define('element-app-one', appOneElement);

        const appOneAlternativeElement = createCustomElement(AppOneAlternativeComponent, { injector: this.injector });
        customElements.define('element-app-one-alternative', appOneAlternativeElement);
    }
}

