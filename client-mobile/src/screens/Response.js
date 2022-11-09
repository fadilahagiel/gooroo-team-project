import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

export default function Response() {
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          GIVE US YOUR FEEDBACK!
        </Text>
        <View style={{ justifyContent: "center", marginTop: 20 }}>
          <Text style={{ color: colors.white, fontSize: 18 }}>RATING</Text>
          <TextInput
            placeholder="rate between 1-10"
            placeholderTextColor={colors.secondaty2}
            editable={true}
            keyboardType="numeric"
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: colors.primary,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              backgroundColor: colors.white,
            }}
          />
        </View>

        <View style={{ justifyContent: "center", marginTop: 20 }}>
          <Text style={{ color: colors.white, fontSize: 18 }}>REVIEW</Text>
          <TextInput
            placeholder="state your review"
            placeholderTextColor={colors.secondaty2}
            multiline
            numberOfLines={4}
            editable={true}
            style={{
              height: 100,
              borderWidth: 1,
              borderColor: colors.primary,
              paddingLeft: 10,
              marginTop: 5,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: colors.primary,
              width: 120,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate("Response")}
          >
            <Text
              style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{ fontSize: 18, fontStyle: "italic", color: colors.white }}
          >
            Notes:
          </Text>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: colors.white }}>
              Your feedback makes us be better than yesterday, thank you for
              joining us! and don't forget to always be eager to learn.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaty2,
    height: "100%",
  },
});

{
  /* <View style={{ flex: 1, marginTop: 10 }}>
<Text style={{ color: colors.secondaty2 }}>RATING</Text>
<TextInput
  placeholder="rate between 1-10"
  placeholderTextColor={colors.secondaty2}
  editable={true}
  style={{
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: colors.white,
  }}
/>
</View>

<View style={{ flex: 2, marginTop: 20 }}>
<Text style={{ color: colors.secondaty2 }}>REVIEW</Text>
<TextInput
  placeholder="state your review"
  placeholderTextColor={colors.secondaty2}
  multiline
  numberOfLines={4}
  editable={true}
  style={{
    height: 80,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingLeft: 10,
    marginTop: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
  }}
/>
</View> */
}
