const fs = require('fs');

const pkgDir = require('pkg-dir');

const getBaseDir = (filename, options = {}) =>
  (options.justHere ? Promise.resolve(process.cwd()) : pkgDir());

const hasPackageFile = (filename, options) => getBaseDir(filename, options)
  .then((dir) => {
    if (dir === undefined) {
      return Promise.reject(new ReferenceError('Directory not found'));
    }
    const path = `${dir}/${filename}`;

    return {
      path,
      exists: fs.existsSync(path),
    };
  });

const editPackageFile = (filename, data, options) => hasPackageFile(filename, options)
  .then(({ path, exists }) => {
    if (!exists || options.overwrite) {
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

const chainEdit = (filename, data, options) =>
  (log = { data: '' }) => editPackageFile(filename, data, options)
    .then(written => ({
      data: `${log.data}\n${filename} ${written ? '' : 'not '}written`,
    }));

module.exports = {
  chainEdit,
  editPackageFile,
  hasPackageFile,
};
