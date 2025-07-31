import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../../atoms";

export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [group, setGroup] = useAtom(selectedGroupAtom);

  const goBack = () => {
    setTitle("");
    setBody("");
    setGroup(null);
    router.back();
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 15 }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="close"
              size={30}
              color={"black"}
              onPress={() => goBack()}
            />
            <Pressable
              style={{ marginLeft: "auto" }}
              onPress={() => console.log("Pressed")}
            >
              <Text
                style={{
                  backgroundColor: "#115BCA",
                  fontWeight: "bold",
                  paddingVertical: 2,
                  paddingHorizontal: 7,
                  borderRadius: 10,
                }}
              >
                Post
              </Text>
            </Pressable>
          </View>

          {/* COMMUNITY SELECTOR */}

          <Link href={"groupSelector"} asChild>
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: "#EDEDED",
                padding: 10,
                borderRadius: 20,
                gap: 5,
                alignSelf: "flex-start",
                marginVertical: 10,
              }}
            >
              {group ? (
                <>
                  <Image
                    source={{ uri: group.image }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                  <Text style={{ fontWeight: "bold" }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      borderRadius: 10,
                      fontWeight: "bold",
                    }}
                  >
                    r/
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>Select a community</Text>
                </>
              )}
            </Pressable>
          </Link>

          {/* INPUTS */}

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
            multiline
            scrollEnabled={false}
          />
          <TextInput
            placeholder="Body text (optional)"
            value={body}
            onChangeText={(bodyText) => setBody(bodyText)}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
