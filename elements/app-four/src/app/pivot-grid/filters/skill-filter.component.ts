import { ICellRendererParams, IFilterParams } from 'ag-grid-community';

import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { Skill } from '../models/data-entity';

@Component({
    template: `
        <div style="display: inline-block">
            <div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey">
                <b>Custom Skills Filter</b>
            </div>
            <div *ngFor="let skill of skills" style="margin-top: 3px; float: left">
                <label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block">
                    <span>
                        <div style="text-align:center">{{skill.name}}</div>
                        <div>
                            <input type="checkbox" (click)="onSkillChanged($event, skill)"/>
                            <span class="custom-icon icon-{{skill.name}}" title="{{skill.name}}"></span>
                        </div>
                    </span>
                </label>
            </div>
        </div>
    `
})
export class SkillFilterComponent implements IFilterAngularComp {
    public skills: Skill[] = [
        {
            name: 'Android',
            field: 'android',
            selected: false
        },
        {
            name: 'CSS',
            field: 'css',
            selected: false
        },
        {
            name: 'HTML 5',
            field: 'html5',
            selected: false
        },
        {
            name: 'Mac',
            field: 'mac',
            selected: false
        },
        {
            name: 'Windows',
            field: 'windows',
            selected: false
        }
    ];

    private params!: IFilterParams;

    agInit(params: IFilterParams): void {
        this.params = params;
    }

    onSkillChanged(event: Event, skill: Skill) {
        skill.selected = (event.target as HTMLInputElement).checked;
        this.params.filterChangedCallback();
    }

    getModel() {
        return this.skills.reduce((state: Record<string, boolean>, skill) => {
            state[skill.field] = skill.selected;
            return state;
        }, {});
    }

    setModel(model: Record<string, boolean>) {
        for (const skill of this.skills) {
            skill.selected = model?.[skill.field] ?? false;
        }
    }

    doesFilterPass(params: ICellRendererParams) {
        const rowSkills = params.data.skills;
        let passed = true;

        for (const skill of this.skills) {
            passed = passed && (skill.selected ? (skill.selected && rowSkills[skill.field]) : true);
        }

        return passed;
    }

    public isFilterActive() {
        return true;
    }

    helloFromSkillsFilter() {
        alert('Hello From The Skills Filter!');
    }
}