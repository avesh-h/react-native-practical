import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";

export default function AddressForm() {
  const { control } = useForm();
  const [address, setAddress] = useState({
    pincode: "",
    city: "",
    state: "",
    houseFlat: "",
    buildingNo: "",
    roadAreaColony: "",
    receiverName: "",
    receiverPhone: "",
    isDefaultAddress: false,
  });

  const handleInputChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Address:", address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Add address</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Address</Text>

          <TextInput
            style={styles.input}
            value={address.pincode}
            onChangeText={(text) => handleInputChange("pincode", text)}
            placeholder="Pincode"
            placeholderTextColor="#888"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={address.city}
              onChangeText={(text) => handleInputChange("city", text)}
              placeholder="City"
              placeholderTextColor="#888"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={address.state}
              onChangeText={(text) => handleInputChange("state", text)}
              placeholder="State"
              placeholderTextColor="#888"
            />
          </View>

          <TextInput
            style={styles.input}
            value={address.houseFlat}
            onChangeText={(text) => handleInputChange("houseFlat", text)}
            placeholder="House/Flat no."
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            value={address.buildingNo}
            onChangeText={(text) => handleInputChange("buildingNo", text)}
            placeholder="Building no."
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            value={address.roadAreaColony}
            onChangeText={(text) => handleInputChange("roadAreaColony", text)}
            placeholder="Road Name/ Area/ Colony"
            placeholderTextColor="#888"
          />

          <Text style={styles.sectionTitle}>Receiver's details</Text>

          <TextInput
            style={styles.input}
            value={address.receiverName}
            onChangeText={(text) => handleInputChange("receiverName", text)}
            placeholder="Receiver's name"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            value={address.receiverPhone}
            onChangeText={(text) => handleInputChange("receiverPhone", text)}
            placeholder="Receiver's phone number"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            value={address.buildingNo}
            onChangeText={(text) => handleInputChange("petName", text)}
            placeholder="Pet's name"
            placeholderTextColor="#888"
          />

          <View style={styles.defaultAddressContainer}>
            <Text>Set as default address</Text>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() =>
                setAddress((prev) => ({
                  ...prev,
                  isDefaultAddress: !prev.isDefaultAddress,
                }))
              }
            >
              {address.isDefaultAddress && (
                <View style={styles.checkboxInner} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  backIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAECF0",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 14,
  },
  halfInput: {
    width: "48%",
  },
  defaultAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "#000",
  },
  saveButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
