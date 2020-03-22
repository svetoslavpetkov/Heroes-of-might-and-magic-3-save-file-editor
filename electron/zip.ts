const unzip = async function(zipFile: string, tagetDir: string) {
    return Promise.resolve();
}

const zip = async function(zipFile: string, tagetDir: string) {
    return Promise.reject("zip is not implemented");
}

export {
    unzip,
    zip
}