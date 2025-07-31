import { FlatList, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Post } from "../../../types/types";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, group:groups(*),user:users!posts_user_id_fkey(*)");

    setPosts(data as Post[]);

    console.log(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
