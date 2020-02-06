import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

const Main = ({ navigation }) => {
  const inset = useSafeArea();
  return (
    <View style={{ paddingTop: inset.top }}>
      <Text>Main page</Text>

      <TouchableOpacity onPress={() => navigation.navigate("preview")}>
        <Text>Preview</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
