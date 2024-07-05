import { WebView } from 'react-native-webview';

export default function App() {
  const webAppUrl = 'http://192.168.10.91:5001';

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