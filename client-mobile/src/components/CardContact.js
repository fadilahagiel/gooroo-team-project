import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function cardContact(item) {
  const { contactId, contactName, roomId, contactImage } = item.contact;
  const [imgSrc, setImgSrc] = useState(contactImage);
  const navigation = useNavigation();

  useEffect(() => {
    console.log({ imgSrc });
  }, []);

  const handleImgError = () => {
    setImgSrc(
      "https://icon-library.com/images/broken-link-icon/broken-link-icon-13.jpg"
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imgSrc }}
        style={styles.contactImg}
        onError={handleImgError}
      />
      <Text style={styles.contactName}>{contactName}</Text>
      {/* <Text style={styles.contactName}>{conntactR}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    width: 350,
    height: 50,
    margin: 5,
    alignItems: "center",
  },
  contactImg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    resizeMode: "cover",
  },
  contactName: {
    margin: 15,
  },
});
