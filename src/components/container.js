import React from "react";
import { View, StyleSheet } from "react-native";

const Container = ({ children, variant = 1 }) => {
  return <View style={[styles[variant], { flex: 1 }]}>{children}</View>;
};
const styles = StyleSheet.create({
  1: {
    paddingHorizontal: 20
  }
});
export default Container;
