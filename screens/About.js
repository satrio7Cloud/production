import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FooterMenu from "../components/Menu/FooterMenu";

const About = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 45,
  },
});

export default About;
