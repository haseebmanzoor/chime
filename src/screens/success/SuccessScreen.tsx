import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const SuccessScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Success!</Text>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#138554",
  },
  text1: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 70,
    fontWeight: "300",
  },
});
