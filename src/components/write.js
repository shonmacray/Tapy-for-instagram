import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Write = ({ onChangeText, value, placeholder, multiline, textBefore }) => {
  return (
    <View style={styles.writeContainer}>
      {
        textBefore ? (<Text style={{marginRight: 5}}>{textBefore}</Text>) : null
      }
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
  writeContainer: {
    flexDirection: 'row',
    alignItems: "center"
  },
  write: {
    fontSize: 20,
    width: '90%'
  }
});
export default Write;
