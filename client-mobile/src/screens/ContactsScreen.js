import { useEffect, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { fetchContacts } from "../actions";
import CardContact from "../components/CardContact";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacs] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");

  const getContacts = async () => {
    let foundContacts = await AsyncStorage.getItem("contacts");
    foundContacts = await JSON.parse(foundContacts);
    setContacs(foundContacts);
    setFilteredContacts(foundContacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  // useEffect(() => {
  //   console.log(search);
  //   setFilteredContacts(contacts.filter(el ===))
  // }, [search]);

  const handleChat = (roomId) => {
    console.log("ke room id ", roomId);
  };

  const handleSearch = (text) => {
    if (text) {
      const newContacts = contacts.filter((el) => {
        const { contactName } = el;
        // const itemData = contactName ? contactName : "";
        // const textData = text;
        return contactName.indexOf(text) > -1;
      });
      setFilteredContacts(newContacts);
      setSearch(text);
    } else {
      setFilteredContacts(contacts);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.search}
          onChangeText={(input) => handleSearch(input)}
          value={search}
          placeholder="Search Contact"
        />
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => item.roomId}
        renderItem={({ item }) => {
          return <CardContact contact={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  contacts: {
    backgroundColor: "red",
    justifyContent: "center",
    height: 50,
    width: 350,
    maxWidth: "90%",
  },
  search: {
    borderWidth: 2,
    width: 350,
    marginVertical: 10,
    padding: 5,
  },
});
