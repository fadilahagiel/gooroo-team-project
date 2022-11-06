import { Text, View, StyleSheet, Button } from "react-native";

export default function Bookmark({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI BOOKMARK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
