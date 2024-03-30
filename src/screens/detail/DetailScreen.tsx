/**
 * ? Local Imports
 */
import React, { useMemo, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import createStyles from "./DetailScreen.style";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { TextInput } from "react-native-paper";
import { fetchUserData } from "@services/FetchUser";
import { Alert } from "react-native";

interface DetailScreenProps {}

const DetailScreen: React.FC<DetailScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [text, setText] = React.useState("");
  const [textPass, setTextPass] = React.useState("");
  const [showPass, setshowPass] = useState(false);
  const [showErrorSheet, setshowErrorSheet] = useState(false);

  const isEmailValid = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return text && re.test(text);
  };

  const isDataValid = () => {
    return !text
      ? false
      : text && !isEmailValid()
        ? false
        : !textPass
          ? false
          : true;
  };

  const handleLogin = () => {
    fetchUserData().then((res: any) => {
      if (res.pass === textPass && text === res.email) {
        //success screen
        console.log(res.pass);
        NavigationService.navigate("Success", {});
      } else {
        setshowErrorSheet(true);
      }
    });
  };

  const ErrorSheet = () => (
    <View
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        padding: 10,
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 10,
      }}
    >
      <Text bold color="#000000">
        Yikes !
      </Text>
      <Text style={{ marginVertical: 15 }}>
        Email and password combination do not match our records
      </Text>
      <RNBounceable
        style={{ backgroundColor: "#b41919", padding: 15, borderRadius: 100 }}
        onPress={() => {
          setshowErrorSheet(false);
        }}
      >
        <Text center color="#FFFFFF" bold>
          Try Again
        </Text>
      </RNBounceable>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../../assets/chime.png")}
        style={{ width: 80, height: 80 }}
        resizeMode="contain"
      />
      <TextInput
        label={
          !text ? "Email" : !isEmailValid() ? "Invalid/Incomplete Email" : ""
        }
        style={{ width: "80%", backgroundColor: "transparent" }}
        underlineColor="gray"
        activeUnderlineColor={!text || isEmailValid() ? "#138554" : "#B41919"}
        value={text}
        underlineStyle={{ marginHorizontal: 12 }}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Password"
        style={{ width: "80%", backgroundColor: "transparent", marginTop: 20 }}
        underlineColor="gray"
        activeUnderlineColor="#138554"
        value={textPass}
        secureTextEntry={!showPass}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setshowPass((prev) => !prev)}
          />
        }
        underlineStyle={{ marginHorizontal: 12 }}
        onChangeText={(text) => setTextPass(text)}
      />
      <Text color={"#138554"} style={{ marginTop: 40, fontWeight: "bold" }}>
        Need Help ?
      </Text>
      <Text
        color={"gray"}
        style={{
          marginTop: 10,
          marginHorizontal: 40,
          textAlign: "center",
          fontWeight: "700",
          fontSize: 12,
          color: "gray",
        }}
      >
        By Clicking "Log in", you agree to receive SMS text messages from Chime
        to verify your identity
      </Text>

      <RNBounceable
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: isDataValid() ? "#8edebb" : "gray",
          padding: 15,
          width: "100%",
        }}
        onPress={() => handleLogin()}
      >
        <Text
          color={!isDataValid() ? "white" : "black"}
          bold
          center
          style={{ fontSize: 15 }}
        >
          Log In
        </Text>
      </RNBounceable>
      {showErrorSheet && <ErrorSheet />}
    </KeyboardAvoidingView>
  );
};

export default DetailScreen;
