import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const Backgrounds = () => {
  const dispatch = useDispatch();
  const [backs] = useState([
    { name: "black", code: "#000" },
    { name: "yellow", code: "#0099ff" }
  ]);
  return (
    <View style={styles.container}>
      {backs.map(back => (
        <TouchableOpacity
          key={back.name}
          onPress={() => dispatch({ type: "SWITCH_COLOR", payload: back.code })}
        >
          <Text>{back.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee"
  }
});
export default Backgrounds;
