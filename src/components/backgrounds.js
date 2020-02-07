import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity as IosTouched,
  Platform
} from "react-native";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const Backgrounds = () => {
  const dispatch = useDispatch();
  const [backs] = useState([
    { name: "1", code: "#FFB900" },
    { name: "2", code: "#0078D7" },
    { name: "3", code: "#00CC6A" },
    { name: "4", code: "#8764B8" },
    { name: "5", code: "#e4405f" },
    { name: "6", code: "#34465d" },
    { name: "7", code: "#da552f" },
    { name: "8", code: "#131418" }
  ]);
  return (
    <View style={styles.panel}>
      {backs.map(back =>
        Platform.OS === "ios" ? (
          <IosTouched
            key={back.name}
            onPress={() =>
              dispatch({ type: "SWITCH_COLOR", payload: back.code })
            }
            style={[styles.Backgrounds, { backgroundColor: back.code }]}
          />
        ) : (
          <TouchableOpacity
            key={back.name}
            onPress={() =>
              dispatch({ type: "SWITCH_COLOR", payload: back.code })
            }
            style={[styles.Backgrounds, { backgroundColor: back.code }]}
          />
        )
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Backgrounds: {
    backgroundColor: "#ddd",
    height: 30,
    width: 30,
    borderRadius: 30,
    marginTop: 5
  }
});
export default Backgrounds;
