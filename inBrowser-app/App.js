import { WebView } from 'react-native-webview';

export default function App() {
  const webAppUrl = 'http://10.0.2.2:5001';

  return (
    <>
    <WebView
      originWhitelist={['*']}
      source={{ uri: webAppUrl }}
      style={{ flex: 1, marginTop: 10 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      mixedContentMode="always"
    />
    </>
  );
};