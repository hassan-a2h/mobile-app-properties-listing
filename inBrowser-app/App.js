import { WebView } from "react-native-webview";
import { Platform } from "react-native";

export default function App() {
  let webAppUrl = "http://10.0.2.2:3000";

  if (Platform.OS === "ios") {
    webAppUrl = "http://localhost:3000";
  }

  return (
    <>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: webAppUrl }}
        style={{ flex: 1, marginTop: 10 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
      />
    </>
  );
}
