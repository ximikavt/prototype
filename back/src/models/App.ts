export interface App {
    /** The route to navigate to when the app is selected. */
    route: string;
    /** The name of the app. */
    name: string;
    /** Element app script path. */
    script: string;
    /** Element app script id. Should be the same for the multiple element apps from one script. */
    id: string;
    /** Element app selector. */
    selector: string;
}