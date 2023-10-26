import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  // handle delete prompt
  const handleDeletePropmpt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to Delete this Post?", [
      {
        text: "Cancle",
        onPress: () => {
          console.log("cancle press");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.navigate("MyPosts");
    } catch (error) {
      console.log("");
      setLoading(false);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Post {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"#313866"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"#C63D2F"}
                  onPress={() => handleDeletePropmpt(post?._id)}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>Title : {post?.title}</Text>
          <Text style={styles.desc}>{post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {" "}
                <FontAwesome5 name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              {" "}
              <FontAwesome5 name="clock" color={"orange"} />{" "}
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#94A684",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF8C9",
    borderWidth: "#ffffff",
    borderWidth: 0.3,
    borderColor: "white",
    padding: 20,
    borderRadius: 7,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
