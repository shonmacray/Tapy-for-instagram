import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Motion from "./motion";

const Decos = ({ onClose }) => {
  const dispatch = useDispatch();
  const es = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        flex: 1,
        position: "relative"
      }}
    >
      {es.map(e => (
        <TouchableOpacity
          key={e}
          onPress={() => {
            dispatch({
              type: "CHANG_DECO",
              payload: e
            });
            onClose();
          }}
        >
          <Motion e={e} />
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Decos;
