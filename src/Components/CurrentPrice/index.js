import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import styles from "./style";

export default function CurrentPrice() {
  return (
    <View style={styles.headerPrice}> 
      <Text style={styles.currentPrice}>$ 5555.45</Text>
      <Text style={styles.textPrice}>Ultima Cotação</Text>
    </View>
  );
}
