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
import numbro from "numbro";

import Backgrounds from "../components/backgrounds";
import Decos from "../components/decos";
import Motion from "../components/motion";
import logo from "../../assets/part.png";

const niceFormat = number => {
  return numbro(number).format({ thousandSeparated: true });
};
const Main = ({ navigation }) => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["17%"] });
  const [visible, setVisible] = useState(true);
  const [deco, setDeco] = useState(false);

  const app = useSelector(state => state.appReducer);
  const selectedPlan = app.plans.find(plan => plan.selected === true);

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
      top: -50,
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
      flexDirection: "row",
      justifyContent: "flex-end",
      bottom: 5
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
      justifyContent: "flex-end",
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
    },
    post: {
      textAlign: "center",
      width: "80%",
      fontSize: 30,
      color: "#fff"
    },
    thanks: {
      justifyContent: "center",
      alignItems: "center"
    }
  });
  useEffect(() => {
    navigation.navigate("plan");
  }, []);
  const processPreview = async () => {
    captureRef(canvasRef, {
      format: "png",
      quality: 1
    }).then(
      async uri => {
        const canShare = await Sharing.isAvailableAsync();
        console.log(canShare);
        if (canShare) {
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
        {Platform.OS === "android" ? (
          <EvilIcons name="share-google" style={styles.sharing} />
        ) : (
          <EvilIcons name="share-apple" style={styles.sharing} />
        )}
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.main}>
      <Modal visible={deco} transparent={true} animationType="slide">
        <TouchableOpacity
          style={styles.modal2}
          activeOpacity={1}
          onPress={() => setDeco(false)}
        >
          <Decos onClose={() => setDeco(false)} />
          <TouchableOpacity
            onPress={() => setDeco(false)}
            style={{ alignItems: "flex-end" }}
          >
            <EvilIcons name="close" style={styles.times2} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => setDeco(true)}>
          <MaterialCommunityIcons name="balloon" style={styles.balloon} />
        </TouchableOpacity>
      </View>
      <View style={styles.canvas} ref={canvasRef}>
        {selectedPlan.name === "Thanks" ? (
          <View style={styles.thanks}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setDeco(true)}>
              <Motion e={app.motion} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.magic}
              onPress={() => setVisible(true)}
            >
              <Text style={styles.text1}>THANK YOU</Text>
              <Text style={styles.big}>{niceFormat(app.following)}</Text>
              <Text style={styles.text1}>FOLLOWERS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.post}>{app.post}</Text>
        )}

        <View style={styles.brandMark}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandName}>TapyApp</Text>
        </View>
      </View>
      <BottomSheet
        snapPoints={sheet.snap}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={false}
      />
    </View>
  );
};

export default Main;
