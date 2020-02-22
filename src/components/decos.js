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
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67
  ];
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
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
