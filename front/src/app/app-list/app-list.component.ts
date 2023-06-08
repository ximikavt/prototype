import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { App } from '../App';

@Component({
    selector: 'app-list',
    templateUrl: './app-list.component.html',
    styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent {
    constructor(public readonly appService: AppService, private readonly router: Router) {
    }

    public selectApp(app: Event) {
        const appElement = (app as CustomEvent).detail as App;
        this.router.navigate([appElement.route]);
    }
}
