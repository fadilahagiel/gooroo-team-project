import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
// import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import colors from "../config/colors";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function CardClasses({ item, navigation }) {
   
    return (
        <View style={{ margin: 5, flexDirection: "row" }}>
            <Image
                source={require("../assets/face_demo.png")}
                style={{
                    flex: 1,
                    width: 70,
                    height: 70,
                    marginRight: 10,
                    borderRadius: 5,
                }}
            />
            <View
                style={{
                    flex: 2,
                    marginLeft: 5,
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Text style={styles.title}>Pecahan</Text>
                <Text style={styles.caption}>By, Mr. Agiel</Text>
                <Text style={styles.caption}>3 Days</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("ClassDetail")}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-end",
                    padding: 10,
                }}
            >
                <IonIcon
                    name="ios-enter-outline"
                    color={colors.white}
                    size={40}
                />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.white,
    },
    caption: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 14,
        color: colors.secondary1,
    },
});