import * as React from "react";
import {
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [pendingVerification, setPendingVerification] =
    React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#f8f9fa",
          paddingBottom: 200,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: "black",
          }}
        >
          Verify Your Email
        </Text>
        <TextInput
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 15,
            backgroundColor: "white",
          }}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#aaa"
          onChangeText={setCode}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
        paddingBottom: 200,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "black",
        }}
      >
        Sign Up
      </Text>
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 15,
          backgroundColor: "white",
        }}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#aaa"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 15,
          backgroundColor: "white",
        }}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Continue" onPress={onSignUpPress} />
    </KeyboardAvoidingView>
  );
}
