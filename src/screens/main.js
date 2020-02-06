import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector } from "react-redux";
import Backgrounds from "../components/backgrounds";
import Followings from "../components/followings";
import Decos from "../components/decos";

const Main = () => {
  const canvasRef = useRef(null);
  const [sheet, setSheet] = useState({ id: 1, snap: ["25%"] });
  const bgColor = useSelector(state => state.backgroundReducer);

  const styles = StyleSheet.create({
    canvas: {
      height: 300,
      alignItems: "center",
      backgroundColor: bgColor
    },
    preview: {
      alignItems: "flex-end"
    },
    bottomSheet: {
      backgroundColor: "#543"
    },
    text1: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center"
    },
    big: {
      fontSize: 45
    }
  });

  const processPreview = async () => {
    captureRef(canvasRef, {
      format: "png",
      quality: 0.8
    }).then(
      async uri => {
        if (Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
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
  const renderHeader = () => (
    <TouchableOpacity onPress={processPreview} style={styles.preview}>
      <Text>Share</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <BottomSheet
        style={styles.snap}
        snapPoints={sheet.snap}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={false}
      />
      <View style={styles.canvas} ref={canvasRef}>
        <TouchableOpacity
          onPress={() => setSheet({ ...sheet, id: 2, snap: ["40%"] })}
        >
          <Text style={styles.text1}>
            THANK YOU{"\n"} <Text style={styles.big}>100</Text>
            {"\n"} FOLLOWERS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSheet({ ...sheet, id: 3, snap: [30] })}
        >
          <Text>Deco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
