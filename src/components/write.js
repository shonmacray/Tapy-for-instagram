import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

const Write = ({ textBefore, loading, onPress, ...rest }) => {
  const styles = StyleSheet.create({
    writeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    write: {
      fontSize: 20,
      width: textBefore ? "80%" : "100%"
    },
    btn: {
      backgroundColor: "#131418",
      width: 40,
      height: 30,
      alignSelf: "flex-end",
      borderRadius: 50,
      justifyContent: "center"
    },
    btnText: {
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center"
    }
  });
  return (
    <View style={styles.writeContainer}>
      {textBefore ? (
        <Text style={{ marginRight: 5, fontSize: 20, color: "#505050" }}>
          {textBefore}
        </Text>
      ) : null}
      <TextInput autoFocus maxLength={100} style={styles.write} {...rest} />
      {textBefore ? (
        <TouchableOpacity style={styles.btn} onPress={(...args) => {
          if(!loading) {
            onPress(args)
          }
        }}>
          {
            loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Set</Text>
          }
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Write;
