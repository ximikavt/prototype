import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotGridComponent } from './pivot-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { RendererComponent } from './renderer.component';
import { SkillFilterComponent } from './filters/skill-filter.component';
import { ProficiencyFilterComponent } from './filters/proficiency-filter.component';


@NgModule({
    declarations: [
        PivotGridComponent,
        RendererComponent,
        SkillFilterComponent,
        ProficiencyFilterComponent
    ],
    imports: [
        CommonModule,
        AgGridModule
    ],
    exports: [PivotGridComponent]
})
export class PivotGridModule {
}
