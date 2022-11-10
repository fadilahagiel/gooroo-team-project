import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  AsyncStorage
} from "react-native";
import colors from "../config/colors";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import axios from 'axios'
import { serverUrl } from "../config/url";
const options = {
  title: "click image",
  type: "library",
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: "photo",
    includeBase64: false,
  },
};

export default function AddProfile({navigation}) {
  const [photo, setPhoto] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelAdd = async (uri, name) => {
    try {
      const formData = new FormData()
      formData.append('image', {
        name: fullName,
        uri: photo,
        type: 'image/png'
      })
      const access_token = await AsyncStorage.getItem("access_token")
      
      const { data } = await axios.post(`${serverUrl}/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token,
          fullName
        }
      })
      navigation.push('Profile')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              justifyContent: "center",
              alignSelf: "center",
              color: colors.white,
            }}
          >
            ADD PHOTO
          </Text>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImage}>
              {photo ? <Image source={{ uri: photo }} style={styles.image}
                resizeMode="center" /> :
                <Image
                  source={{
                    uri: "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
                  }}
                  style={styles.image}
                  resizeMode="center"
                />}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 30,
            marginHorizontal: 40,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 20 }}>Full Name</Text>
          <TextInput
            placeholder="My Full Name"
            placeholderTextColor={colors.secondaty2}
            onChangeText={setFullName}
            editable={true}
            style={{
              height: 45,
              borderWidth: 1,
              borderColor: colors.primary,
              padding: 10,
              borderRadius: 10,
              marginTop: 5,
              backgroundColor: colors.white,
            }}
          />
          <View style={{ alignItems: "flex-end", marginTop: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                height: 45,
                width: 70,
                borderRadius: 20,
              }}
              onPress={() => {
                handelAdd(photo, fullName);
              }}
            >
              <Text style={{ fontSize: 18, color: colors.white }}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{ fontSize: 16, fontStyle: "italic", color: colors.white }}
            >
              Notes:
            </Text>
            <Text style={{ fontSize: 14, color: colors.white }}>
              Being the best always requires sacrifice. We, GooRoo, hope that
              you are able to grow and develop into a better person than
              yesterday. keep fighting and keep the spirit, our regards, GooRoo.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaty2,
    height: "100%",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 5,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
