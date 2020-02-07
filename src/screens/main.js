import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector } from "react-redux";
import { useSafeArea } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Backgrounds from "../components/backgrounds";
import Followings from "../components/followings";

var numbro = require("numbro");

const niceFormat = number => {
  return numbro(number).format({ average: true });
};
const Main = () => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["17%"] });
  const app = useSelector(state => state.appReducer);

  const styles = StyleSheet.create({
    canvas: {
      height: 300,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: app.background,
      width: "100%"
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
    },
    deco: {
      position: "absolute",
      right: 20,
      top: area.top + 5
    },
    balloon: {
      color: "#fff",
      fontSize: 40
    },
    button: {
      backgroundColor: "#fff",
      marginRight: 20,
      marginBottom: 10,
      height: 35,
      width: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10
    },
    sharing: {
      fontWeight: "bold",
      color: "#505050"
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
        return (
          <Followings
            onClose={() => setSheet({ ...sheet, id: 1, snap: ["25%"] })}
          />
        );
      default:
        return <Backgrounds />;
    }
  };
  const renderHeader = () => (
    <View style={styles.preview}>
      <TouchableOpacity onPress={processPreview} style={styles.button}>
        <Text style={styles.sharing}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: app.background,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingTop: area.top
      }}
    >
      <TouchableOpacity style={styles.deco}>
        <MaterialCommunityIcons name="balloon" style={styles.balloon} />
      </TouchableOpacity>

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
            THANK YOU{"\n"}{" "}
            <Text style={styles.big}>{niceFormat(app.following)}</Text>
            {"\n"} FOLLOWERS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
