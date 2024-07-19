import { Platform } from "react-native";

function getBackendAddress() {
  if (Platform.OS === "ios") {
    return "http://localhost:3000";
  } 
  
  if (Platform.OS === 'android') {
    return "http://10.0.2.2:3000";
  }
}

export default getBackendAddress;