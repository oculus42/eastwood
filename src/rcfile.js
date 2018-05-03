const fs = require('fs');

const pkgDir = require('pkg-dir');


const hasEslintRc = () => {
    return pkgDir()
        .then(dir => {
            if (dir === null) {
                Promise.reject(new ReferenceError('Directory not found'));
            }
            return {
                path: dir + '/.eslintrc',
                exists: fs.existsSync(dir + '/.eslintrc')
            };
        });
};

const editLintRc = (data, overwrite) => {
    return hasEslintRc()
        .then(({path, exists}) => {
            if (!exists || overwrite) {
                return new Promise((resolve, reject) => {
                    fs.writeFile(path, data, (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(true);
                    })
                });
            }
        });
};

module.exports = {
    editLintRc
};
