import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState(false);

  // async load; on fail try again after 10ms
  const loadContacts = (onFail) => {
    Contacts.getContactsAsync()
      .then((result) => {
        setContacts(result);
      })
      .catch(() => {
        setTimeout(onFail, 10);
      });
  };

  // load on init
  // here we delay 1s just to catch logic errors with no contacts
  useEffect(() => {
    setTimeout(() => {
      loadContacts(loadContacts);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {contacts?.data?.length && (
        <FlatList
          data={contacts.data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
