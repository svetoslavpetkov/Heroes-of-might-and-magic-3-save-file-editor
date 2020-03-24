import { DefaultAdapter } from "./defaultAdapter";
import { IFileAdapter } from "./abstraction";

export class AdapterFactory {
    static getInstance(): IFileAdapter {
        //base on something, user input or file we can handle different load/save logic
        return new DefaultAdapter();
    }
}
