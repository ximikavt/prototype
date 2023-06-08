import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
    selector: 'element-app-one-alternative',
    templateUrl: './app-one-alternative.component.html',
    styleUrls: ['./app-one-alternative.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AppOneAlternativeComponent {
    public campaignOne = new FormGroup({
        start: new FormControl(new Date(year, month, 13)),
        end: new FormControl(new Date(year, month, 16)),
    });
    public campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19)),
    });
}
