import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Write = ({ onChangeText }) => {
  return (
    <View style={styles.writeContainer}>
      <TextInput
        placeholder="Whats on your mind?"
        autoFocus
        multiline
        maxLength={100}
        style={styles.write}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  write: {
    fontSize: 20
  },
  writeContainer: {
    marginBottom: 30
  }
});
export default Write;
