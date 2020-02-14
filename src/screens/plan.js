import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const Plan = ({ navigation }) => {
  const inset = useSafeArea();
  const [following, setFollowing] = useState("");
  const [showActivity, setShowActivity] = useState(false);

  const app = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

  const onUpdate = () => {
    if (following.trim() !== "") {
      dispatch({
        type: "UPDATE_FOLLOWING",
        payload: following
      });
      setShowActivity(true);
      setTimeout(() => {
        navigation.goBack();
        setShowActivity(false);
      }, 1000);
    }
  };
  return (
    <View style={[styles.modal, { paddingTop: inset.top }]}>
      <View style={styles.closeContainer}>
        <Text style={styles.follow}>Enter Following</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name="close" style={styles.times} />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Current following"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={text => setFollowing(text)}
          value={following}
        />
        <View style={styles.boxingContainer}>
          {app.plans.map(plan => (
            <TouchableOpacity
              style={[
                styles.boxing,
                plan.selected ? styles.boxingSelected : null
              ]}
              onPress={() => dispatch({ type: "SELECT_PLAN" })}
              key={plan.name}
            >
              <Text style={styles.bthanks}>{plan.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={onUpdate}>
          <Text style={styles.update}>Set</Text>
        </TouchableOpacity>
      </View>
      {showActivity ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 30
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
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderBottomColor: "#CA8C00",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    height: 45,
    borderRadius: 10,
    marginVertical: 15
  },
  closeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10
  },
  follow: {
    fontWeight: "bold",
    color: "#505050",
    fontSize: 24
  },
  times: {
    fontSize: 30,
    color: "#505050"
  },
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
  boxingContainer: {
    marginVertical: 30,
    flexDirection: "row"
  },
  boxImage: {
    height: 35,
    width: 35,
    resizeMode: "contain"
  },
  bthanks: {
    marginTop: 5,
    fontSize: 16
  }
});
export default Plan;
