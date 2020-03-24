import * as fs from "fs"

const moveFile = async function(source:string, target: string) {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, target, (err) => {
            if(err) {
                reject(err.message);
            } else {
                resolve();
            }
        });
    });
}

const createDir = async function(dirPath:string) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, {recursive: true},(err) => { 
        if(err) {
          reject(err.message);
        } else {
          fs.chmod(dirPath, "0666", (err) => {
            if(err) {
              reject(err.message);
            }
            resolve(); 
          })
        }
      });
    });
  }

  const readFile = async function(path:string):Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err,data)=> {
        if(err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }

  export {
      createDir,
      moveFile,
      readFile,
  }