import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity as IosTouched,
  Platform
} from "react-native";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeArea } from "react-native-safe-area-context";

const Backgrounds = () => {
  const dispatch = useDispatch();
  const area = useSafeArea();
  const [backgroundColors] = useState([
    { name: "1", code: "#FFAB00" },
    { name: "2", code: "#0078D7" },
    { name: "3", code: "#66BB6A" },
    { name: "4", code: "#673AB7" },
    { name: "5", code: "#F06292" },
    { name: "6", code: "#e53935" },
    { name: "7", code: "#34495e" },
    { name: "8", code: "#131418" }
  ]);

  const styles = StyleSheet.create({
    panel: {
      height: 560,
      padding: 20,
      backgroundColor: "#ffffff",
      margin: 3,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: (area.bottom*5)
    },
    Backgrounds: {
      backgroundColor: "#ddd",
      height: 30,
      width: 30,
      borderRadius: 30,
      marginTop: 5
    }
  });
  
  return (
    <View style={styles.panel}>
      {backgroundColors.map(back =>
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

export default Backgrounds;
