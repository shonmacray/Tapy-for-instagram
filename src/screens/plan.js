import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Write from "../components/write";
import i1 from "../assets/64/1.png";
import i2 from "../assets/64/41.png";

const Plan = ({ navigation }) => {
  const inset = useSafeArea();
  const [following, setFollowing] = useState("");
  const [post, setPost] = useState("");

  const app = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

  const onUpdate = () => {
    // if (following.trim() !== "") {
    //   dispatch({
    //     type: "UPDATE_FOLLOWING",
    //     payload: following
    //   });
    //   navigation.goBack();
    // }
    if (app.plan === "Thanks") {
      alert("thanks");
    } else {
      if (post.trim() !== "") {
        dispatch({ type: "SET_POST", payload: post.trim() });
        navigation.goBack();
      }
    }
  };
  return (
    <View style={[styles.modal, { paddingTop: inset.top }]}>
      <View style={styles.closeContainer}>
        <Text style={styles.follow}>
          {app.plan === "Thanks" ? "Instagram" : "Post"}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name="close" style={styles.times} />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputContainer}>
          {app.plan === "Thanks" ? (
            // <TextInput
            //   placeholder="Username"
            //   style={styles.input}
            //   onChangeText={text => setFollowing(text)}
            //   value={following}
            // />
            <Write
              onChangeText={text => setFollowing(text)}
              value={following}
              placeholder="Username"
            />
          ) : (
            <Write
              onChangeText={text => setPost(text)}
              value={post}
              placeholder="Whats on your mind?"
              multiline={true}
            />
          )}
        </View>

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
              {plan.name === "Thanks" ? (
                <Image source={i1} style={styles.images} />
              ) : (
                <Image source={i2} style={styles.images} />
              )}
              <Text style={styles.bthanks}>{plan.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={onUpdate}>
          <Text style={styles.update}>Set</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    borderWidth: 1,
    borderBottomColor: "#CA8C00",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    height: 45,
    borderRadius: 10
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
    color: "#FFAB00",
    fontSize: 20
  },
  bthanks: {
    marginTop: 5,
    fontSize: 16
  },
  images: {
    height: 30,
    width: 30,
    resizeMode: "contain"
  },
  inputContainer: {
    minHeight: 50
  }
});
export default Plan;
