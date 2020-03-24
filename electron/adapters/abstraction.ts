import { Map } from "../model/model"
export interface IFileAdapter {
    readData(buffer:Buffer): Map;
}
