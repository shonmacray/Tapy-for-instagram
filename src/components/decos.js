import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    31,
    32,
    33,
    34,
    35,
    36
  ];
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap"
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
    </ScrollView>
  );
};
export default Decos;
