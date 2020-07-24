module.exports = {
  webpack(config, options) {
    const graphqlLetLoader = {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: ["@babel/preset-typescript"],
        plugins: [
          'graphql-let/babel',
          '@babel/plugin-syntax-jsx',
        ],
      },
    };
    const babelRule = config.module.rules.find(rule => {
      return rule.use.loader === 'next-babel-loader'
          || rule.use.some(({ loader }) => {
            return loader === 'next-babel-loader';
          });
    });
    babelRule.include.push(/node_modules\/graphql-let/);
    if (!Array.isArray(babelRule.use)) {
      babelRule.use = [babelRule.use];
    }
    babelRule.use.push(graphqlLetLoader);

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-tag/loader', 'graphql-let/schema/loader'],
    });

    return config;
  },
};
