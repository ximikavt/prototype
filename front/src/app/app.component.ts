import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public readonly showHomeButton$ = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => (e as NavigationEnd).url.length > 1)
    );

    constructor(private readonly router: Router) {
    }
}
