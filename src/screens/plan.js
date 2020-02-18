import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Write from "../components/write";
import PlanBox from "../components/PlanBox";
import i1 from "../assets/64/1.png";
import i2 from "../assets/64/41.png";

const Plan = ({ navigation }) => {
  const inset = useSafeArea();
  const [following, setFollowing] = useState("");
  const [post, setPost] = useState("");

  const app = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

  const selectedPlan = app.plans.find(plan => plan.selected === true);

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
    <ScrollView style={[styles.modal, { paddingTop: inset.top }]}>
      <View style={styles.closeContainer}>
        <Text style={styles.follow}>
          {selectedPlan.name === "Thanks" ? "Instagram" : "Post"}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name="close" style={styles.times} />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputContainer}>
          {selectedPlan.name === "Thanks" ? (
            <Write
              onChangeText={text => setFollowing(text)}
              value={following}
              placeholder="Username"
              textBefore="@"
              autoCapitalize="none"
              autoCorrect={false}
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
            <PlanBox 
              key={plan.name}
              iconComponent={plan.name === 'Thanks' ? (<Image source={i1} style={styles.images} />) : (<Image source={i2} style={styles.images} />)}
              text={plan.name} 
              selected={selectedPlan.name === plan.name}
              onPress={() => dispatch({ type: "SELECT_PLAN", payload: { plan } })}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={onUpdate}>
          <Text style={styles.update}>Set</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
