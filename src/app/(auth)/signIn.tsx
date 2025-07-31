import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

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
        Sign In
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
      <Button title="Sign In" onPress={onSignInPress} />
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "grey",
          }}
        >
          Don't have an account?
        </Text>
        <Link href="/signUp" asChild>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {" "}
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
