import { Component, ViewEncapsulation } from '@angular/core';
import {
    CellClickedEvent,
    CellContextMenuEvent,
    CellDoubleClickedEvent,
    ColDef,
    ColGroupDef,
    ColumnApi,
    DateFilter,
    DateFilterModel,
    GridApi,
    GridReadyEvent,
    ICellRendererParams
} from 'ag-grid-community';

import RefData from './data';

import 'ag-grid-enterprise';
import { RendererComponent } from './renderer.component';
import { SkillFilterComponent } from './filters/skill-filter.component';
import { ProficiencyFilterComponent } from './filters/proficiency-filter.component';
import { DataEntity } from './models/data-entity';


@Component({
    selector: 'pivot-grid',
    templateUrl: './pivot-grid.component.html',
    styleUrls: ['./pivot-grid.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class PivotGridComponent {
    public rowData: DataEntity[] = [];
    public columnDefs: (ColGroupDef<DataEntity> | ColDef<DataEntity>)[] = [];
    public rowCount = '';

    public defaultColDef: ColDef<DataEntity>;
    public sideBar = false;

    public api!: GridApi;
    public columnApi!: ColumnApi;

    constructor() {
        this.defaultColDef = {
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            headerComponentParams: {
                menuIcon: 'fa-bars'
            }
        };


        this.createRowData();
        this.createColumnDefs();
    }

    public showSideBar(event: Event) {
        this.sideBar = (event.target as HTMLInputElement).checked;
    }

    public createRowData() {
        const rowData: DataEntity[] = [];

        for (let i = 0; i < 200; i++) {
            const countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                dob: RefData.DOBs[i % RefData.DOBs.length],
                address: RefData.addresses[i % RefData.addresses.length],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                mobile: createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
    }

    public onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
    }

    public onGridReady(params: GridReadyEvent) {
        console.log('onGridReady');

        this.api = params.api;
        this.columnApi = params.columnApi;

        this.api.sizeColumnsToFit();

        this.calculateRowCount();
    }

    public onCellClicked(event: CellClickedEvent) {
        console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field);
    }

    public onCellDoubleClicked(event: CellDoubleClickedEvent) {
        console.log('onCellDoubleClicked: ' + event.rowIndex + ' ' + event.colDef.field);
    }

    public onCellContextMenu(event: CellContextMenuEvent) {
        console.log('onCellContextMenu: ' + event.rowIndex + ' ' + event.colDef.field);
    }

    public onQuickFilterChanged(event: Event) {
        this.api.setQuickFilter((event.target as HTMLInputElement).value);
    }

    public invokeSkillsFilterMethod() {
        this.api.getFilterInstance('skills', (instance: SkillFilterComponent | null) => {
            instance?.helloFromSkillsFilter();
        });
    }

    public dobFilter() {
        this.api.getFilterInstance('dob', (dateFilterComponent: DateFilter | null) => {
            dateFilterComponent?.setModel({
                type: 'equals',
                dateFrom: '2000-01-01'
            } as DateFilterModel);

            this.api.onFilterChanged();
        });
    }

    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: '#',
                width: 40,
                checkboxSelection: true,
                filter: false,
                sortable: false,
                suppressMenu: true,
                pinned: true
            },
            {
                headerName: 'Employee',
                children: [
                    {
                        field: 'name',
                        width: 150,
                        pinned: true,
                        enableRowGroup: true,
                        enablePivot: true
                    },
                    {
                        field: 'country',
                        width: 150,
                        cellRenderer: countryCellRenderer,
                        pinned: true,
                        filterParams: {
                            cellRenderer: countryCellRenderer,
                            cellHeight: 20
                        },
                        enableRowGroup: true,
                        enablePivot: true,
                        columnGroupShow: 'open'
                    },
                    {
                        headerName: 'DOB',
                        field: 'dob',
                        width: 195,
                        pinned: true,
                        cellRenderer: (params: ICellRendererParams) => {
                            return pad(params.value.getDate(), 2) + '/' +
                                pad(params.value.getMonth() + 1, 2) + '/' +
                                params.value.getFullYear();
                        },
                        menuTabs: ['filterMenuTab'],
                        filter: 'agDateColumnFilter',
                        columnGroupShow: 'open'
                    }
                ]
            },
            {
                headerName: 'IT Skills',
                children: [
                    {
                        field: 'skills',
                        width: 125,
                        sortable: false,
                        cellRenderer: skillsCellRenderer,
                        menuTabs: ['filterMenuTab'],
                        filter: SkillFilterComponent,
                        enableRowGroup: true,
                        enablePivot: true
                    },
                    {
                        field: 'proficiency',
                        width: 160,
                        cellRenderer: percentCellRenderer,
                        menuTabs: ['filterMenuTab'],
                        filter: ProficiencyFilterComponent
                    },
                ]
            },
            {
                headerName: 'Contact',
                children: [
                    {
                        field: 'mobile',
                        cellRenderer: RendererComponent,
                        minWidth: 150,
                        filter: 'agTextColumnFilter'
                    },
                    {
                        field: 'address',
                        minWidth: 500,
                        filter: 'agTextColumnFilter'
                    }
                ]
            }
        ];
    }

    private calculateRowCount() {
        if (this.api && this.rowData) {
            const model = this.api.getModel();
            const totalRows = this.rowData.length;
            const processedRows = model.getRowCount();
            this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    }
}

function skillsCellRenderer(params: ICellRendererParams) {
    const data = params.data;
    const skills: string[] = [];
    RefData.IT_SKILLS.forEach(function (skill) {
        if (data && data.skills && data.skills[skill]) {
            skills.push(`<span class="custom-icon icon-${skill}" title="${skill}"></span>`);
        }
    });
    return skills.join(' ');
}

function countryCellRenderer(params: ICellRendererParams) {
    return `<img alt="${params.value}" width="15" height="10" style="margin-right: 5px" src="https://flagcdn.com/w20/${RefData.COUNTRY_CODES[params.value]}.png">${params.value}`;
}

function createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += ' ';
        }
    }
    return result;
}

function percentCellRenderer(params: ICellRendererParams) {
    const value = params.value;

    const eDivPercentBar = document.createElement('div');
    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
        eDivPercentBar.style.backgroundColor = 'red';
    } else if (value < 60) {
        eDivPercentBar.style.backgroundColor = '#ff9900';
    } else {
        eDivPercentBar.style.backgroundColor = '#00A000';
    }

    const eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';

    const eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);

    return eOuterDiv;
}

//Utility function used to pad the date formatting.
function pad(num: number, totalStringSize: number) {
    let asString = num + '';
    while (asString.length < totalStringSize) asString = '0' + asString;
    return asString;
}
