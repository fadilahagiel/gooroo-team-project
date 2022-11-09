import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import colors from "../config/colors";

export default function cardContact(item) {
  const { contactId, contactName, roomId, contactImage, contactRole } =
    item.contact;
  const [imgSrc, setImgSrc] = useState(contactImage);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log({ item });
  }, []);

  const handleChat = (chatRoom) => {
    // console.log({ chatRoom });
    navigation.navigate("ChatScreen", { roomId: chatRoom });
  };

  const handleImgError = () => {
    setImgSrc(
      "https://icon-library.com/images/broken-link-icon/broken-link-icon-13.jpg"
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => handleChat(roomId)}>
        <Image
          source={{ uri: imgSrc }}
          style={styles.contactImg}
          onError={handleImgError}
        />
        <View style={styles.contactDetail}>
          <Text style={styles.contactName}>{contactName}</Text>
          <Text style={styles.contactRole}>{contactRole}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary1,
    flex: 1,
    flexDirection: "row",
    width: 350,
    height: 60,
    margin: 5,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
  },
  contactImg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginHorizontal: 5,
    resizeMode: "cover",
  },
  contactDetail: {
    margin: 10,
  },
  contactName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
  },
  contactRole: {
    fontSize: 10,
    color: colors.green2,
  },
});
