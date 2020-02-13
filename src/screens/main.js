import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
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
import e38 from "../assets/64/38.png";
import e9 from "../assets/64/9.png";
import logo from "../../assets/part.png";

const numbro = require("numbro");
const niceFormat = number => {
  return numbro(number).format({ thousandSeparated: true });
};
const Main = () => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["17%"] });
  const [visible, setVisible] = useState(true);
  const [deco, setDeco] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [boxes, setBoxes] = useState([
    { name: "Thanks", selected: true, emoji: e38 },
    { name: "Status", selected: false, emoji: e9 }
  ]);
  const [following, setFollowing] = useState("");

  const app = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

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
    modal: {
      paddingTop: Platform.OS === "ios" ? area.top : 0,
      backgroundColor: "#fff",
      flex: 1,
      paddingHorizontal: 30
    },
    modal2: {
      paddingTop: Platform.OS === "ios" ? area.top : 0,
      flex: 1,
      backgroundColor: "rgba(0,0,0, .87)"
    },
    btn: {
      backgroundColor: "#1D6EDB",
      height: 45,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15
    },
    update: {
      fontWeight: "bold",
      color: "#fff"
    },
    input: {
      fontSize: 18,
      borderWidth: 1,
      borderBottomColor: "#CA8C00",
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      height: 45,
      borderRadius: 10,
      marginVertical: 15
    },
    follow: {
      fontWeight: "bold",
      color: "#505050",
      fontSize: 24
    },
    times: {
      fontSize: 30,
      color: "#505050"
    },
    times2: {
      fontSize: 30,
      color: "#fff",
      marginBottom: 30
    },
    closeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      marginTop: 10
    },
    decos: {
      position: "absolute",
      bottom: 0
    },
    magic: {
      justifyContent: "center",
      alignItems: "center"
    },
    boxing: {
      width: 100,
      height: 100,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center"
    },
    boxingSelected: {
      borderWidth: 2,
      borderColor: "#007CCA"
    },
    boxingContainer: {
      marginVertical: 30,
      flexDirection: "row"
    },
    boxImage: {
      height: 35,
      width: 35,
      resizeMode: "contain"
    },
    bthanks: {
      marginTop: 5,
      fontSize: 16
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
  const selectbox = () => {
    boxes.map(box => {
      if (box.selected === true) {
        box.selected = false;
        setBoxes([...boxes]);
      } else {
        box.selected = true;
        setBoxes([...boxes]);
      }
    });
  };
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

  const onUpdate = () => {
    if (following.trim() !== "") {
      dispatch({
        type: "UPDATE_FOLLOWING",
        payload: following
      });
      setShowActivity(true);
      setTimeout(() => {
        setVisible(false);
        setShowActivity(false);
      }, 1000);
    }
  };
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
      <Modal visible={visible} transparent={false} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <Text style={styles.follow}>Enter Following</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <EvilIcons name="close" style={styles.times} />
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              placeholder="Current following"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={text => setFollowing(text)}
              value={following}
            />
            <View style={styles.boxingContainer}>
              {boxes.map(box => (
                <TouchableOpacity
                  style={[
                    styles.boxing,
                    box.selected ? styles.boxingSelected : null
                  ]}
                  onPress={selectbox}
                  key={box.name}
                >
                  <Image source={box.emoji} style={styles.boxImage} />
                  <Text style={styles.bthanks}>{box.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.btn} onPress={onUpdate}>
              <Text style={styles.update}>Set</Text>
            </TouchableOpacity>
          </View>
          {showActivity ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default Main;
