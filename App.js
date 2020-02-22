import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { getStore, getPersistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Navigator from "./src/navigator";

export default function App() {
  const myStore = getStore();
  const myPersistor = getPersistor();
  return (
    <Provider store={myStore}>
      <PersistGate persistor={myPersistor} loading={<Text>Loading</Text>}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <Navigator />
          </View>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
