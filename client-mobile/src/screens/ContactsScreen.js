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
import colors from "../config/colors";
import CardContact from "../components/CardContact";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacs] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");

  const getContacts = async () => {
    await fetchContacts();
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    let userContacts = await fetchContacts(user.id);
    userContacts = JSON.stringify(userContacts);
    userContacts = JSON.parse(userContacts);
    setContacs(userContacts.contacts);
    setFilteredContacts(userContacts.contacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleSearch = (text) => {
    if (text) {
      const newContacts = contacts.filter((el) => {
        const { contactName } = el;
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
    borderRadius: 10,
  },
});
