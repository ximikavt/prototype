import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { DynamicAppComponent } from './dynamic-app/dynamic-app.component';
import { AppListComponent } from './app-list/app-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainPageComponent } from './main-page/main-page.component';

export function initializeRoutes(router: Router, appService: AppService): () => Promise<void> {
    return () => new Promise((resolve) => {
        appService.apps$.subscribe(apps => {
            router.resetConfig([
                {
                    path: '',
                    component: MainPageComponent
                },
                ...apps.map(app => ({
                    path: app.route,
                    data: app,
                    component: DynamicAppComponent,
                }))
            ]);
            resolve();
        });
    });
}

@NgModule({
    declarations: [
        AppComponent,
        DynamicAppComponent,
        AppListComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeRoutes,
            multi: true,
            deps: [Router, AppService],
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        this.initAppListElementApp();
    }

    private initAppListElementApp() {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', '/elements/element-app-list.js');
        scriptTag.setAttribute('type', 'text/javascript');
        document.body.appendChild(scriptTag);
    }
}
