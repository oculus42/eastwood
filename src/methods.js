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
            .then((log) => {
                return rcFile.editLintRc('{\n  "extends":"airbnb"\n}\n')
                    .then((written) => {
                        return `${log.data}\n${written?'.eslintrc written':'.eslintrc not written'}`;
                    })
            })
            .then(data => ({ data }));
    },
    'airbnb-base': function () {
        const packages = [
            'eslint',
            'eslint-plugin-import',
            'eslint-config-airbnb-base',
        ];

        return installPackages(packages)
            .then((log) => {
                return rcFile.editLintRc('{\n  "extends":"airbnb"\n}\n')
                    .then((written) => {
                        return `${log}\n${written?'.eslintrc written':'.eslintrc not written'}`;
                    })
            })
            .then(data => ({ data }));
    },
};

module.exports = methods;