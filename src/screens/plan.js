import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Write from "../components/write";
import PlanBox from "../components/PlanBox";
import i1 from "../assets/64/1.png";
import i2 from "../assets/64/41.png";
import Container from "../components/container";
import { getInstaUser, niceFormat } from "../functions";

const Plan = ({ navigation }) => {
  const inset = useSafeArea();
  const app = useSelector(state => state.appReducer);
  
  const [following, setFollowing] = useState("");
  const [post, setPost] = useState(app.post);
  const [loadingUser, setLoadingUser] = useState(false);

  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const selectedPlan = app.plans.find(plan => plan.selected === true);

  const onUpdate = () => {
    if (selectedPlan.name === "Thanks") {
      if (user.username && user.followingCount) {
        navigation.goBack();
      } else {
        alert('Enter your Instagram username and press Set to continue.');
      }
    } else {
      if (post.trim() !== "") {
        dispatch({ type: "SET_POST", payload: post.trim() });
        navigation.goBack();
      } else {
        alert('Write something to continue.');
      }
    }
  };
  const getFollowing = async () => {
    if (following !== "" || user.username) {
      setLoadingUser(true);
      try{
        const { count, username } = await getInstaUser(following || user.username);
        dispatch({type: "SAVE_USER", payload: {username, followingCount: count}});
      } catch(e) {
        alert('Failed to get data from Instagram');
      } finally {
        setLoadingUser(false);
      }
    }
  };
  useEffect(() => {
    getFollowing();
  }, []);
  const clearLocalStore = () => {
    dispatch({ type: "CLEAR_USERNAME" });
  };
  return (
    <ScrollView style={[styles.modal, { paddingTop: inset.top }]}>
      <Container>
        <View style={styles.closeContainer}>
          <View style={styles.follow}>
            <Text style={styles.insta}>Instagram</Text>
            {user.username ? (
              <Text style={styles.username}>{user.username}</Text>
            ) : null}
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="close" style={styles.times} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.inputContainer}>
            {selectedPlan.name === "Thanks" ? (
              user.username !== null ? (
                <View>
                  {user.followingCount ? (
                    <View style={styles.followerContainer}>
                      <Text style={styles.followers}>
                        {niceFormat(user.followingCount)}
                      </Text>
                      <TouchableOpacity onPress={clearLocalStore}>
                        <SimpleLineIcons name="reload" style={styles.icons} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ) : (
                <Write
                  onChangeText={text => setFollowing(text)}
                  value={following}
                  placeholder="Username"
                  textBefore="@"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onPress={getFollowing}
                  loading={loadingUser}
                />
              )
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
                iconComponent={
                  plan.name === "Thanks" ? (
                    <Image source={i1} style={styles.images} />
                  ) : (
                    <Image source={i2} style={styles.images} />
                  )
                }
                text={plan.name}
                selected={selectedPlan.name === plan.name}
                onPress={() =>
                  dispatch({ type: "SELECT_PLAN", payload: { plan } })
                }
              />
            ))}
          </View>
          <TouchableOpacity style={styles.btn} onPress={onUpdate}>
            <Text style={styles.update}>Done</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff"
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
    fontSize: 24,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden"
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
  },
  followers: {
    fontSize: 35
  },
  username: {
    fontSize: 20,
    fontWeight: "normal",
    backgroundColor: "#8764B8",
    color: "#fff",
    marginLeft: 20,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  followerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icons: {
    fontSize: 20,
    color: "#131418"
  },
  insta: {
    fontSize: 20
  }
});
export default Plan;
