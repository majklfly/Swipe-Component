import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { Card, Button } from "react-native-elements";

import { Deck } from "./src/components/Deck";
import * as Data from "./src/dummyData";

export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card further
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Deck data={Data.DATA} renderCard={renderCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
