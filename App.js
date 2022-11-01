import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import HistoryGraphic from "./src/Components/HistoryGraphic/";
import QuotationList from "./src/Components/QuotationList/";
import CurrentPrice from "./src/Components/CurrentPrice";
import QuotationIten from "./src/Components/QuotationList/QuotationIten/";

function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}
function url(qtdDias) {
  const date = new Date();
  const listLastDays = qtdDias;
  const end_date = 
  `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
  date.setDate(date.getDate() - listLastDays);
  const start_date = 
  `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
  //URL  GET API
  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;;
}

async function getListCoins(url) {
  let response = await fetch(url);
  let retunrApi = await response.json();
  let selectListQuotations = retunrApi.bpi;
  const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
    return {
      data: key.split("-").reverse().join("/"),
      valor: selectListQuotations[key],
    };
  });
  let data = queryCoinsList.reverse();
  return data;
}

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = returnApiG.bpi;
  const queryCoinsList = Object.keys(selectListQuotationsG).map((key) => {
    return selectListQuotationsG[key];
  });
  let dataG = queryCoinsList;
  return dataG;
}


export default function App() {
 const [coinsList, setCoinsList] = useState([])
 const [coinsGraphicList, setCoinsGraphicList] = useState([0])
 const [days, setDays] = useState(30)
 const [updateData, setupdateData] = useState(true)
 
 function updateDay(number){
  setDays(number);
  setupdateData(true);
 }
 
 useEffect(() => {
  getListCoins(url(days)).then((data) => {
    setcoinsList(data);
  });
  getPriceCoinsGraphic(url(days)).then((dataG) => {
    setcoinsGrafichList(dataG);
  });
  if (updateData) {
    setupdateData(false);
  }
}, [updateData]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f50d41" barStyle="light-content" />
      <CurrentPrice />
      <HistoryGraphic />
      <QuotationList filterDay = {updateDay} listTransactions ={coinsList}/>
      <QuotationIten />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
