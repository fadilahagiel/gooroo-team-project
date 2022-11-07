import { Text, View, StyleSheet, Button } from "react-native";

export default function ClassDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI DETAIL Class</Text>
      <Button title="Go Back to List" onPress={() => navigation.goBack()} />
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
