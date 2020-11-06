import { Linking } from "react-native";

function callPolice () {

    Linking.openURL(`tel:${190}`);

}

export { callPolice };