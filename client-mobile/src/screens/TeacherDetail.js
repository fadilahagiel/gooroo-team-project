import { Text, View, StyleSheet, Button } from "react-native";

export default function TeacherDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI DETAIL TEACHER</Text>
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
