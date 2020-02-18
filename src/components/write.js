import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Write = ({ textBefore, ...rest}) => {
  return (
    <View style={styles.writeContainer}>
      {
        textBefore ? (<Text style={{marginRight: 5}}>{textBefore}</Text>) : null
      }
      <TextInput
        autoFocus
        maxLength={100}
        style={styles.write}
        {...rest}
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
