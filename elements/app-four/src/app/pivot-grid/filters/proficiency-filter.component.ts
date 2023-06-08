import { IDoesFilterPassParams, IFilterParams, ValueGetterParams } from 'ag-grid-community';

import { Component, OnDestroy } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { DataEntity, Proficiency } from '../models/data-entity';

@Component({
    template: `
        <div>
            <div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey">
                <b>Custom Proficiency Filter</b>
            </div>
            <div *ngFor="let proficiency of PROFICIENCIES" style="margin-top: 3px">
                <label style="padding-left: 4px">
                    <input type="radio" [checked]="selected === proficiency" (change)="onButtonPressed(proficiency)"/>
                    {{proficiency.name}}
                </label>
            </div>
        </div>
    `
})
export class ProficiencyFilterComponent implements OnDestroy, IFilterAngularComp {
    public PROFICIENCIES: Proficiency[] = [
        {
            name: 'No Filter',
            threshold: 0
        },
        {
            name: 'Above 40%',
            threshold: 40
        },
        {
            name: 'Above 60%',
            threshold: 60
        },
        {
            name: 'Above 80%',
            threshold: 80
        },
    ];

    public selected: Proficiency = this.PROFICIENCIES[0];

    public params!: IFilterParams;

    agInit(params: IFilterParams): void {
        this.params = params;
    }

    ngOnDestroy() {
        console.log('Destroying P');
    }

    public onButtonPressed(proficiency: Proficiency) {
        this.selected = proficiency;
        this.params.filterChangedCallback();
    }

    public doesFilterPass(params: IDoesFilterPassParams) {
        const value = this.params.valueGetter(params as ValueGetterParams<DataEntity>);
        const valueAsNumber = parseFloat(value);
        return valueAsNumber >= this.selected.threshold;
    }

    public isFilterActive() {
        return this.selected !== this.PROFICIENCIES[0];
    }

    public getModel() {
        return undefined;
    }

    public setModel(): void {
        console.log(this);
    }
}