import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import BottomSheet from "reanimated-bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { useSafeArea } from "react-native-safe-area-context";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import Backgrounds from "../components/backgrounds";

var numbro = require("numbro");

const niceFormat = number => {
  return numbro(number).format({ average: true });
};
const Main = () => {
  const canvasRef = useRef(null);
  const area = useSafeArea();
  const [sheet, setSheet] = useState({ id: 1, snap: ["17%"] });
  const [visible, setVisible] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [following, setFollowing] = useState("");

  const app = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    canvas: {
      height: 300,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: app.background,
      width: "100%",
      position: "relative"
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
    deco: {
      position: "absolute",
      right: 20,
      top: area.top + 5
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
      paddingTop: area.top,
      backgroundColor: "#fff",
      flex: 1,
      paddingHorizontal: 30
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
      borderColor: "#505050",
      height: 45,
      borderRadius: 10,
      paddingLeft: 15,
      marginVertical: 15
    },
    follow: {
      fontWeight: "bold",
      color: "#505050",
      fontSize: 15,
      marginTop: 30
    },
    times: {
      fontSize: 30,
      color: "#505050"
    },
    closeContainer: {
      alignItems: "flex-end"
    },
    decos: {
      position: "absolute",
      bottom: 0
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
      <TouchableOpacity style={styles.deco} onPress={() => setVisible(true)}>
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
        <View style={styles.magic}>
          <Text style={styles.text1}>THANK YOU</Text>
          <Text style={styles.big}>{niceFormat(app.following)}</Text>
          <Text style={styles.text1}>FOLLOWERS</Text>
        </View>
      </View>
      <Modal visible={visible} transparent={false} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <EvilIcons name="close" style={styles.times} />
            </TouchableOpacity>
          </View>
          <Text style={styles.follow}>Your following</Text>

          <View>
            <TextInput
              placeholder="max 1000,000,000"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={text => setFollowing(text)}
              value={following}
            />

            <TouchableOpacity style={styles.btn} onPress={onUpdate}>
              <Text style={styles.update}>Set Following</Text>
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
