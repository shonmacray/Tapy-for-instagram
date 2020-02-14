import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { useSafeArea } from "react-native-safe-area-context";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import Backgrounds from "../components/backgrounds";
import Decos from "../components/decos";
import Motion from "../components/motion";
import logo from "../../assets/part.png";

const numbro = require("numbro");
const niceFormat = number => {
  return numbro(number).format({ thousandSeparated: true });
};
const Main = ({ navigation }) => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["17%"] });
  const [deco, setDeco] = useState(false);

  const app = useSelector(state => state.appReducer);

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: app.background,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      paddingTop: area.top
    },
    canvas: {
      height: 300,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: app.background,
      width: "100%",
      position: "relative"
    },
    brandMark: {
      position: "absolute",
      bottom: 5,
      right: 34,
      alignItems: "center"
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
      fontWeight: "900"
    },
    big: {
      fontSize: 45,
      textAlign: "center",
      color: "#fff"
    },
    heading: {
      position: "absolute",
      top: area.top,
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10
    },
    balloon: {
      color: "#fff",
      fontSize: 40
    },
    sharing: {
      fontSize: 40,
      color: "#fff"
    },
    sharingContainer: {
      marginRight: 20
    },
    modal2: {
      paddingTop: Platform.OS === "ios" ? area.top : 0,
      flex: 1,
      backgroundColor: "rgba(0,0,0, .87)"
    },
    times2: {
      fontSize: 30,
      color: "#fff",
      marginBottom: 30
    },
    decos: {
      position: "absolute",
      bottom: 0
    },
    magic: {
      justifyContent: "center",
      alignItems: "center"
    },
    logo: {
      resizeMode: "contain",
      height: 20,
      width: 20
    },
    brandName: {
      fontSize: 11,
      color: "#fff"
    },
    doing: {
      fontSize: 24,
      color: "#fff"
    }
  });
  useEffect(() => {
    navigation.navigate("plan");
  });
  const processPreview = async () => {
    captureRef(canvasRef, {
      format: "png",
      quality: 1
    }).then(
      async uri => {
        if (Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        }
      },
      error => console.error("Oops, snapshot failed", error)
    );
  };
  const renderContent = () => <Backgrounds />;

  const renderHeader = () => (
    <View style={styles.preview}>
      <TouchableOpacity
        onPress={processPreview}
        style={styles.sharingContainer}
      >
        <EvilIcons name="share-google" style={styles.sharing} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.main}>
      <Modal visible={deco} transparent={true} animationType="slide">
        <View style={styles.modal2}>
          <Decos onClose={() => setDeco(false)} />
          <TouchableOpacity
            onPress={() => setDeco(false)}
            style={{ alignItems: "flex-end" }}
          >
            <EvilIcons name="close" style={styles.times2} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.heading}>
        <Text style={styles.doing}>Thanks</Text>
        <TouchableOpacity onPress={() => setDeco(true)}>
          <MaterialCommunityIcons name="balloon" style={styles.balloon} />
        </TouchableOpacity>
      </View>

      <BottomSheet
        style={styles.snap}
        snapPoints={sheet.snap}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={false}
      />
      <View style={styles.canvas} ref={canvasRef}>
        <Motion e={app.motion} />
        <TouchableOpacity style={styles.magic} onPress={() => setVisible(true)}>
          <Text style={styles.text1}>THANK YOU</Text>
          <Text style={styles.big}>{niceFormat(app.following)}</Text>
          <Text style={styles.text1}>FOLLOWERS</Text>
        </TouchableOpacity>
        <View style={styles.brandMark}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandName}>TapyApp</Text>
        </View>
      </View>
    </View>
  );
};

export default Main;
