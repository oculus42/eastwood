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

const chainEdit = (data, overwrite) =>
    (log = { data: '' }) => editLintRc(data, overwrite)
        .then((written) => {
            log.data = `${log.data}\n${written?'.eslintrc written':'.eslintrc not written'}`;
            return log;
        });

module.exports = {
    chainEdit,
    editLintRc,
};
