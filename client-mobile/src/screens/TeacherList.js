import { Text, View, StyleSheet, Button } from "react-native";

export default function TeacherList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>INI LIST TEACHER</Text>
      <Button
        title="Teacher Detail"
        onPress={() => navigation.navigate("TeacherDetail")}
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
