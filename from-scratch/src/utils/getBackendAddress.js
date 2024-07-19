import { Platform } from "react-native";

function getBackendAddress() {
  let address = "http://10.0.2.2:3000";

  if (Platform.OS === "ios") {
    address = "http://localhost:3000";
  }

  return address;
}

export default getBackendAddress;