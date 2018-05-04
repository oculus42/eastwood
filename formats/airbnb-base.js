module.exports = {
  packages: [
    'eslint',
    'eslint-plugin-import',
    'eslint-config-airbnb-base',
  ],
  eslintrc: `{
  "extends": "airbnb-base"
}
`,
  editorconfig: `root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
# editorconfig-tools is unable to ignore longs strings or urls
max_line_length = null
`,
};
