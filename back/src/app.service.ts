import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { App } from './models/App';


@Injectable()
export class AppService {
    private readonly apps: App[];

    constructor() {
        this.apps = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }

    getApps(): App[] {
        return this.apps;
    }
}
