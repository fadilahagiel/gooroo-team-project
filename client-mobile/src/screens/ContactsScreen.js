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
import FeatherIcon from "react-native-vector-icons/Feather";

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" color={colors.primary} size={30} />
        </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  search: {
    borderWidth: 2,
    width: 300,
    // marginVertical: 20,
    marginLeft: 15,
    padding: 5,
    borderRadius: 10,
  },
  contacts: {
    backgroundColor: "red",
    justifyContent: "center",
    height: 50,
    width: 350,
    maxWidth: "90%",
  },
});
