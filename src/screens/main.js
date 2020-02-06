import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector } from "react-redux";
import Backgrounds from "../components/backgrounds";
import Followings from "../components/followings";
import Decos from "../components/decos";

const Main = ({ navigation }) => {
  const inset = useSafeArea();
  const canvasRef = useRef(null);
  const [sheet, setSheet] = useState({ id: 1, snap: ["9"] });
  const backgroundColor = useSelector(state => state.backgroundReducer);

  const processPreview = async () => {
    captureRef(canvasRef, {
      format: "png",
      quality: 0.8
    }).then(
      async uri => {
        if (Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, { UTI: "Share Image on Instagram" });
        }
      },
      error => console.error("Oops, snapshot failed", error)
    );
  };
  const renderContent = () => {
    switch (sheet.id) {
      case 1:
        return <Backgrounds />;
      case 2:
        return <Followings />;
      case 3:
        return <Decos />;
      default:
        return <Backgrounds />;
    }
  };
  return (
    <View
      style={{
        paddingTop: inset.top,
        flex: 1,
        backgroundColor: backgroundColor
      }}
    >
      <BottomSheet
        style={styles.snap}
        snapPoints={sheet.snap}
        renderContent={renderContent}
      />

      <TouchableOpacity onPress={processPreview}>
        <Text>Preview</Text>
      </TouchableOpacity>
      <View style={styles.canvas} ref={canvasRef}>
        <TouchableOpacity
          onPress={() => setSheet({ ...sheet, id: 2, snap: ["20"] })}
        >
          <Text>Clip This</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSheet({ ...sheet, id: 3, snap: ["30"] })}
        >
          <Text>Deco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  canvas: {
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default Main;
