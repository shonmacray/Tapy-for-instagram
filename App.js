import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Store from "./src/redux/store";
import Navigator from "./src/navigator";

export default function App() {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Navigator />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
