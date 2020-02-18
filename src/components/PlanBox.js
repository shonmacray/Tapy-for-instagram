import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const PlanBox = ({iconComponent, text, onPress, selected}) => {
  return (
      <TouchableOpacity
        style={[
          styles.boxing,
          selected ? styles.boxingSelected : null
        ]}
        onPress={onPress}
      >
        {
          iconComponent
        }
        <Text style={styles.bthanks}>{text}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boxing: {
    width: 100,
    height: 100,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center"
  },
  boxingSelected: {
    borderWidth: 2,
    borderColor: "#007CCA"
  },
  bthanks: {
    marginTop: 5,
    fontSize: 16
  },
});

export default PlanBox;
