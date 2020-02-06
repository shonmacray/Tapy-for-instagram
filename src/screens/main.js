import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const Main = ({ navigation }) => {
  const inset = useSafeArea();
  const canvasRef = useRef(null);

  const [dimensions, setDimension] = useState(null);

  const processPreview = async () => {
    captureRef(canvasRef, {
      format: "png",
      quality: 0.8
    }).then(
      async uri => {
        // console.log("Image saved to", uri);
        if (Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, { UTI: "Share Image on Instagram" });
        }
      },
      error => console.error("Oops, snapshot failed", error)
    );
  };
  const layout = event => {
    if (dimensions) return;
    let { width, height } = event.nativeEvent.layout;
    setDimension({ dimensions: { width, height } });
  };
  return (
    <View style={{ paddingTop: inset.top, flex: 1, backgroundColor: "#fff" }}>
      <Text>Main page</Text>

      <TouchableOpacity onPress={processPreview}>
        <Text>Preview</Text>
      </TouchableOpacity>
      <View style={styles.canvas} ref={canvasRef}>
        <Text>Clip This</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  canvas: {
    height: 300,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default Main;
