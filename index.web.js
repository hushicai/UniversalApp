// h5、pc等平台公用.web文件
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const appEnv = process.env.MODE === 'production' ? 'release' : 'dev';

const parseUrl = function (url) {
  let query = url.substr(url.lastIndexOf('?') + 1);
  let params = query.split('&');
  let result = {};
  for (let i = 0, len = params.length; i < len; i++) {
    if (!params[i]) {
      continue;
    }
    let param = params[i].split('=');
    let key = param[0];
    let value = param[1];

    result[key] = value;
  }

  return result;
};
// eslint-disable-next-line no-undef
const params = parseUrl(location.search);

console.log('[params]', params);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {
    $native_props: {
      app_env: appEnv,
    },
    ...params,
  },
  rootTag: document.getElementById('app'),
});
