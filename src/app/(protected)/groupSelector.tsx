import {
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import groups from "../../../assets/data/groups.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../atoms";
import { Group } from "../../types";

export default function GroupSelector() {
  const [searchValue, setSearchValue] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
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
            onPress={() => router.back()}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              paddingRight: 30,
            }}
          >
            Post to
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightgrey",
            borderRadius: 5,
            gap: 5,
            marginVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <AntDesign name="search1" size={16} color={"grey"} />
          <TextInput
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
            placeholder="Search for a community"
            placeholderTextColor={"grey"}
            style={{
              paddingVertical: 10,
              flex: 1,
            }}
          />
          {searchValue && (
            <AntDesign
              name="closecircle"
              size={15}
              hitSlop={40}
              color="#E4E4E4"
              onPress={() => setSearchValue("")}
            />
          )}
        </View>
        <FlatList
          style={{ marginTop: 10 }}
          data={filteredGroups}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onGroupSelected(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
              }}
            >
              <Image
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
                source={{ uri: item.image }}
              />
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
