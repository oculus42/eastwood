const cmd = require('node-cmd');
const rcFile = require('./rcfile');

const defaultArgs = ['airbnb'];

const installPackages = (packageList = []) => {
    return new Promise((resolve, reject) => {
        cmd.get(`npm install ${packageList.join(' ')}`, (err, data, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                data,
                stderr,
            });
        });
    });
};

const methods = {
    airbnb: function () {
        const packages = [
            'eslint',
            'eslint-plugin-import',
            'eslint-plugin-react',
            'eslint-plugin-jsx-a11y',
            'eslint-config-airbnb',
        ];

        return installPackages(packages)
            .then(rcFile.chainEdit('{\n  "extends":"airbnb"\n}\n'))
    },
    'airbnb-base': function () {
        const packages = [
            'eslint',
            'eslint-plugin-import',
            'eslint-config-airbnb-base',
        ];

        return installPackages(packages)
            .then(rcFile.chainEdit('{\n  "extends":"airbnb"\n}\n'))
    },
    google: function () {
        const packages = [
            'eslint',
            'eslint-config-google',
        ];

        return installPackages(packages)
            .then(rcFile.chainEdit('{\n  "extends":"google"\n}\n'))
    },
};

module.exports = methods;
