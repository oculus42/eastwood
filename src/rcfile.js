const fs = require('fs');

const pkgDir = require('pkg-dir');

const hasPackageFile = (filename) => {
    return pkgDir()
        .then(dir => {
            if (dir === null) {
                return Promise.reject(new ReferenceError('Directory not found'));
            }
            const path = `${dir}/${filename}`;

            return {
                path,
                exists: fs.existsSync(path),
            };
        });
};

const editPackageFile = (filename, data, overwrite) => {
    return hasPackageFile(filename)
        .then(({ path, exists }) => {
            if (!exists || overwrite) {
                return new Promise((resolve, reject) => {
                    fs.writeFile(path, data, (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(true);
                    });
                });
            }
            return Promise.resolve(false);
        });
};

const chainEdit = (filename, data, overwrite) =>
    (log = { data: '' }) => editPackageFile(filename, data, overwrite)
        .then((written) => {
            log.data = `${log.data}\n${filename} ${written?'':'not '}written`;
            return log;
        });

module.exports = {
    chainEdit,
    editPackageFile,
    hasPackageFile,
};
