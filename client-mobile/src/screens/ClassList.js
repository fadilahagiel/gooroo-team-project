import { Text, View, StyleSheet, Button } from "react-native";

export default function ClassList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI CLASS LIST</Text>
      <Button
        title="Go Back Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
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
