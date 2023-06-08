import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { App } from './App';

@Component({
    selector: 'app-list',
    styleUrls: ['./app-list.component.scss'],
    templateUrl: './app-list.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AppListComponent {
    @Input() public apps: App[] = [];
    @Output() public selectApp = new EventEmitter<App>();
}
