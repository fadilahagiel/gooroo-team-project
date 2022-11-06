import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import colors from "../config/colors";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Text>INI HOME</Text>
      <Button
        title="Class List"
        onPress={() => navigation.navigate("ClassList")}
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
