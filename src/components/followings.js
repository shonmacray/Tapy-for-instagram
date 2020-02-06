import React from "react";
import { View, StyleSheet } from "react-native";

const Followings = () => {
  return <View style={styles.panel}></View>;
};
const styles = StyleSheet.create({
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.5,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default Followings;
