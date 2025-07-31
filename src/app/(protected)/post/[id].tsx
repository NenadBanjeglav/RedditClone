import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";
import comments from "../../../../assets/data/comments.json";
import CommentListItem from "../../../components/CommentListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardStatus } from "../../../hooks/useKeyboardStatus";

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState<string>("");
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardStatus();

  const inputRef = useRef<TextInput | null>(null);

  const detailedPost = posts.find((post) => post.id === id);

  const postComments = comments.filter(
    (comment) => comment.post_id === detailedPost?.id
  );

  const handleReplyButtonPress = useCallback((commentId: string) => {
    console.log(commentId);
    inputRef.current?.focus();
  }, []);

  if (!detailedPost) return <Text>Post Not Found</Text>;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={insets.top}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: isKeyboardVisible ? insets.bottom : 60,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <PostListItem post={detailedPost} isDetailedPost />
          }
          data={postComments}
          renderItem={({ item }) => (
            <CommentListItem
              comment={item}
              depth={0}
              handleReplyButtonPressed={handleReplyButtonPress}
            />
          )}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            padding: 10,
            backgroundColor: "white",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,

            elevation: 4,
          }}
        >
          <TextInput
            placeholder="Join the conversation"
            ref={inputRef}
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{ backgroundColor: "#E4E4E4", padding: 5, borderRadius: 5 }}
            multiline
          />

          <Pressable
            disabled={!comment}
            onPress={() => console.error("Pressed")}
            style={{
              backgroundColor: !comment ? "lightgrey" : "#0d469b",
              borderRadius: 15,
              marginLeft: "auto",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              Reply
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
