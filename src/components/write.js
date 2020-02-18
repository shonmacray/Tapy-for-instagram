import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Write = ({ onChangeText, value, placeholder, multiline }) => {
  return (
    <View style={styles.writeContainer}>
      <TextInput
        placeholder={placeholder}
        autoFocus
        multiline={multiline}
        maxLength={100}
        style={styles.write}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  write: {
    fontSize: 20
  }
});
export default Write;
