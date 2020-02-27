const tsjest = require('ts-jest');
const {relative, join} = require('path');
const {readFileSync} = require('fs');

module.exports = {
  process(_content, path, context, options) {
    const {cwd} = context;
    const fragment = relative(cwd, path)
    const fullPath = join(cwd, 'node_modules/graphql-let/__generated__', fragment + '.tsx');
    const content = readFileSync(fullPath, 'utf-8');
    return tsjest.process(content, fullPath, context, options)
  }
}
