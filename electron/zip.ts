import * as sevenBin from "7zip-bin"
const { extractFull } = require('node-7z');

const unzip = function(zipFile: string, tagetDir: string) {
    return new Promise((resolve,reject) => {
        const pathTo7zip = sevenBin.path7za;
        const promise = extractFull(zipFile, tagetDir , {
            $bin: pathTo7zip,
        });

        if(promise.then) {
            promise.then(() => {
                console.log("hurray");
                resolve();
            }).catch((err:any) => {
                reject(err);
            });
        } else {
            setTimeout(() => {
                resolve();
            }, 1000);
        }
    });
}
const zip = async function(zipFile: string, tagetDir: string) {
    
    return Promise.reject("zip is not implemented");
}

export {
    unzip,
    zip
}