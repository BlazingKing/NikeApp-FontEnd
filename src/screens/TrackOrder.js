import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useGetOrderQuery } from "../store/apiSlice";

const TrackOrder = () => {
  const [ref, setRef] = useState("");

  const { data, isLoading, error } = useGetOrderQuery(ref);

  const product = data?.data;

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && <Text>Order not found</Text>}
      {data?.status === "OK" && (
        <View>
          <ScrollView>
            <Text>{JSON.stringify(product, null, 2)}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TrackOrder;
