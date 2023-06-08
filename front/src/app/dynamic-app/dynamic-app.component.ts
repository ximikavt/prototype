import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { take } from 'rxjs';
import { App } from '../App';

const SCRIPT_ID_ATTRIBUTE = 'script-id';

@Component({
    selector: 'dynamic-app',
    templateUrl: './dynamic-app.component.html',
    styleUrls: ['./dynamic-app.component.scss']
})
export class DynamicAppComponent {
    private scriptTag!: HTMLScriptElement;

    constructor(private readonly route: ActivatedRoute, private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
        this.route.data.pipe(take(1)).subscribe((data: Data) => {
            this.attachScriptTag(data as App);
            this.attachElementApp((data as App).selector);
        });
    }

    private attachScriptTag(app: App): void {
        if (document.querySelector(`script[app-id="${SCRIPT_ID_ATTRIBUTE}"]`)) {
            return;
        }
        this.scriptTag = this.renderer.createElement('script');
        this.scriptTag.setAttribute(SCRIPT_ID_ATTRIBUTE, `${app.id}`);
        this.scriptTag.setAttribute('src', `${app.script}`);
        this.scriptTag.setAttribute('type', 'text/javascript');
        this.renderer.appendChild(document.body, this.scriptTag);
    }

    private attachElementApp(selector: string): void {
        const elementApp = this.renderer.createElement(selector);
        this.renderer.appendChild(this.elementRef.nativeElement, elementApp);
    }
}
