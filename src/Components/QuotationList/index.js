import React, { Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import QuotationIten from "./QuotationIten";
import styles from "./style";

export default function QuotationList(props) {

  const daysQuery = props.filterDay

  return (
    <Fragment>
      <View style={styles.filters}>
        <TouchableOpacity style={styles.buttonQuery} onPress={() => daysQuery(7)}>
          <Text style={styles.texButtonQuery}>7D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuery} onPress={() => daysQuery(15)}>
          <Text style={styles.texButtonQuery}>15D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuery} onPress={() => daysQuery(30)}>
          <Text style={styles.texButtonQuery}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuery} onPress={() => daysQuery(90)}>
          <Text style={styles.texButtonQuery}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuery} onPress={() => daysQuery(180)}>
          <Text style={styles.texButtonQuery}>6M</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listQuotationBitcoins}>{/*adicionar um estilo */}
        <FlatList
          data={props.listTransactions}
          renderItem={({ item }) => {
            return <QuotationIten valor={item.valor} data={item.data} />;
          }}
        />
 </ScrollView>
      
    </Fragment>
  );
}
