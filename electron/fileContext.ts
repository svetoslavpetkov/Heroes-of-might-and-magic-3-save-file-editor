import { v4 as newUuid, v4 } from "uuid"
import * as path from "path";


export class FileContext {
    readonly originalFilePath:string;
    readonly  uuid:string;
    
    
    readonly rootTempDirName:string = "SaveGameEditor";
    readonly tempDirPath:string;
    readonly tempZipPath:string;
    readonly extractedFilePath:string;

    private readonly originalFileDirPath:string;

    constructor(originalFilePath:string) {
        this.uuid = v4();
        this.originalFilePath = originalFilePath;
        this.originalFileDirPath = path.dirname(originalFilePath);

        this.tempDirPath = path.join(this.originalFileDirPath, this.rootTempDirName,this.uuid);
        
        const inputFileParsed = path.parse(originalFilePath);

        this.tempZipPath = path.join(this.tempDirPath, `${inputFileParsed.name}.zip`);
        this.extractedFilePath = path.join(this.tempDirPath, inputFileParsed.name);
    }


}