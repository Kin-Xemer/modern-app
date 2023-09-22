module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins:[
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				cwd: 'babelrc',
				root: ['./src'],
				extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
				alias: {
					'@assets': './src/assets',
					'@atoms': './src/atoms',
					'@components': './src/components',
					'@data': './src/data',
					'@models': './src/models',
					'@utils': './src/utils',
					'@i18n': './src/i18n',
					'@context': './src/context',
					'@config': './src/config',
					'@screens': './src/screens',
					'@reducers': './src/reducers',
					'@epics': './src/epics',
					'@hooks': './src/hooks',
					'@services': './src/services',
				},
			},
		],
	],
};
