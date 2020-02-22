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
import { useSelector } from "react-redux";
import { useSafeArea } from "react-native-safe-area-context";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";

import Backgrounds from "../components/backgrounds";
import Decos from "../components/decos";
import Motion from "../components/motion";
import logo from "../../assets/part.png";
import { niceFormat } from "../functions";
import Container from "../components/container";

const Main = ({ navigation }) => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["8%", "17%"] });
  const [deco, setDeco] = useState(false);

  const app = useSelector(state => state.appReducer);
  const user = useSelector(state => state.userReducer);
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
      backgroundColor: app.background,
      width: "100%",
      position: "relative"
    },
    brandMark: {
      position: "absolute",
      bottom: 5,
      right: 20,
      alignItems: "center"
    },
    preview: {
      flexDirection: "row",
      justifyContent: "space-between",
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
    headerIcons: {
      color: "#fff",
      fontSize: 40
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
      fontSize: 30,
      color: "#fff",
      textAlign: "center"
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
        if (canShare) {
          await Sharing.shareAsync(uri);
        }
      },
      error => console.error("Oops, snapshot failed", error)
    );
  };
  const renderContent = () => <Backgrounds />;

  const renderHeader = () => (
    <Container>
      <View style={styles.preview}>
        <TouchableOpacity onPress={() => setDeco(true)}>
          <MaterialCommunityIcons
            name="sticker-emoji"
            style={styles.headerIcons}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={processPreview}>
          {Platform.OS === "android" ? (
            <MaterialCommunityIcons
              name="share-outline"
              style={styles.headerIcons}
            />
          ) : (
            <EvilIcons name="share-apple" style={styles.headerIcons} />
          )}
        </TouchableOpacity>
      </View>
    </Container>
  );
  return (
    <View style={styles.main}>
      <Modal visible={deco} transparent={true} animationType="slide">
        <Container style={styles.modal2}>
          <Decos onClose={() => setDeco(false)} />
          <TouchableOpacity
            onPress={() => setDeco(false)}
            style={{ alignItems: "flex-end" }}
          >
            <EvilIcons name="close" style={styles.times2} />
          </TouchableOpacity>
        </Container>
      </Modal>
      <View style={styles.canvas} ref={canvasRef}>
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {selectedPlan.name === "Thanks" ? (
            <View style={styles.thanks}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDeco(true)}
              >
                <Motion e={app.motion} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.magic}
                onPress={() => navigation.navigate("plan")}
              >
                <Text style={styles.text1}>THANK YOU</Text>
                <Text style={styles.big}>{niceFormat(user.followingCount)}</Text>
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
        </Container>
      </View>
      <BottomSheet
        snapPoints={sheet.snap}
        initialSnap={0}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={false}
      />
    </View>
  );
};

export default Main;
