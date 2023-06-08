export interface DataEntity {
    name: string;
    skills: Skills;
    dob: Date;
    address: string;
    years: number;
    proficiency: number;
    country: string;
    continent: string;
    language: string;
    mobile: string;
}

export interface Skills {
    android: boolean;
    html5: boolean;
    mac: boolean;
    windows: boolean;
    css: boolean;
}

export interface Skill {
    name: string;
    field: string;
    selected: boolean;
}

export interface Proficiency {
    name: string;
    threshold: number;
}
