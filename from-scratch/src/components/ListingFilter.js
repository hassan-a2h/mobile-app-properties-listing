import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const { height } = Dimensions.get("window");

const FilterComponent = ({ onApplyFilters }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const slideAnimation = useRef(new Animated.Value(height)).current;

  const categoryItems = [
    { label: "Select Category", value: "" },
    { label: "Home", value: "home" },
    { label: "Villa", value: "villa" },
    { label: "Apartment", value: "apartment" },
    { label: "Building", value: "building" },
    { label: "Office", value: "office" },
    { label: "Townhouse", value: "townhouse" },
    { label: "Shop", value: "shop" },
    { label: "Garage", value: "garage" },
  ];

  const handleApplyFilters = () => {
    const filters = {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      category: category || undefined,
      location: location || undefined,
    };
    onApplyFilters(filters);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setLocation("");

    const filters = {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      category: category || undefined,
      location: location || undefined,
    };

    onApplyFilters(filters);
  };

  const togglePicker = () => {
    if (showPicker) {
      Animated.timing(slideAnimation, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowPicker(false));
    } else {
      setShowPicker(true);
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearFilter}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Min Price"
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Max Price"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.pickerTrigger} onPress={togglePicker}>
        <Text>
          {category
            ? categoryItems.find((item) => item.value === category).label
            : "Select Category"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleApplyFilters}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>

      {showPicker && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={togglePicker}
        />
      )}
      <Animated.View
        style={[
          styles.pickerContainer,
          { transform: [{ translateY: slideAnimation }] },
        ]}
      >
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => {
            setCategory(itemValue);
            togglePicker();
          }}
        >
          {categoryItems.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  clearButtonText: {
    fontSize: 12,
    color: "#555",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 6,
    height: 36,
  },
  pickerTrigger: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#00B98E",
    padding: 10,
    marginTop: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    position: "absolute",
    height: 230,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
  },
});

export default FilterComponent;
