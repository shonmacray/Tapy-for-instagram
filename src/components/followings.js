import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity as IosTouches,
  Platform,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { TouchableOpacity as AndroidTouches } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const Followings = ({ onClose }) => {
  const [following, setFollowing] = useState("");
  const dispatch = useDispatch();

  const onUpdate = () => {
    if (following.trim() !== "") {
      dispatch({
        type: "UPDATE_FOLLOWING",
        payload: following
      });
      onClose();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      keyboardVerticalOffset={100}
    >
      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.follow}>Following</Text>
          {Platform.OS === "ios" ? (
            <IosTouches onPress={onClose}>
              <FontAwesome name="times-circle" style={styles.times} />
            </IosTouches>
          ) : (
            <AndroidTouches onPress={onClose}>
              <FontAwesome name="times-circle" style={styles.times} />
            </AndroidTouches>
          )}
        </View>

        <View>
          <TextInput
            placeholder="max 1000,000,000"
            keyboardType="numeric"
            style={styles.input}
            value={following}
            onChangeText={text => setFollowing(text)}
          />
          {Platform.OS === "ios" ? (
            <IosTouches style={styles.btn} onPress={onUpdate}>
              <Text style={styles.update}>Update</Text>
            </IosTouches>
          ) : (
            <AndroidTouches style={styles.btn} onPress={onUpdate}>
              <Text style={styles.update}>Update</Text>
            </AndroidTouches>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
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
    flexDirection: "column"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#FCCA00",
    height: 45,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 15
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
  follow: {
    fontWeight: "bold",
    color: "#505050",
    fontSize: 15
  },
  times: {
    fontSize: 18,
    color: "#505050"
  }
});
export default Followings;
