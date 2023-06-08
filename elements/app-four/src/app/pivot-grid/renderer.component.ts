import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-renderer-component',
    template: `
        <span>{{value}}</span>
    `
})
export class RendererComponent<TValue> implements OnInit, ICellRendererAngularComp {
    public value!: TValue;

    // a simple renderer just to illustrate that normal Angular DI will work in grid components
    constructor(private renderer: Renderer2, private el: ElementRef) {
    }

    agInit(params: ICellRendererParams) {
        this.value = params.value;
    }


    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'lightblue');
    }

    refresh(params: ICellRendererParams): boolean {
        this.value = params.value;
        return true;
    }
}