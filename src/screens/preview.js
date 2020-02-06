import React from "react";
import { View, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

const Preview = () => {
  const inset = useSafeArea();
  return (
    <View style={{ paddingTop: inset.top }}>
      <Text>Preview page</Text>
    </View>
  );
};

export default Preview;
