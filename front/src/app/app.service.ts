import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { App } from './App';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public readonly apps$: Observable<App[]>;
    private readonly host = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {
        this.apps$ = this.http
            .get<App[]>(`${this.host}/apps`)
            .pipe(
                map(v => v)
            );
    }
}