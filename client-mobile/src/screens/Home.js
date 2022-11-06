import { Text, View, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI HOME</Text>
      <Button
        title="Class List"
        onPress={() => navigation.navigate("ClassList")}
      />
      <Button
        title="See Teacher List"
        onPress={() => navigation.navigate("TeacherList")}
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
