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
import { useFilter } from "../context/FilterContext";

const { height } = Dimensions.get("window");

const FilterComponent = ({ globalFilters, setFiltersActive }) => {
  const { updateFilters } = useFilter();
  const [filters, setFilters] = useState(globalFilters);
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
    setFiltersActive(true);
    updateFilters(filters);
  };

  const updateLocalFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleClearFilter = () => {
    setFiltersActive((prev) => false);
    updateFilters({
      minPrice: "",
      maxPrice: "",
      category: "",
      location: "",
    });
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
          value={filters.minPrice}
          onChangeText={(value) => updateLocalFilters({ minPrice: value })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Max Price"
          value={filters.maxPrice}
          onChangeText={(value) => updateLocalFilters({ maxPrice: value })}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.pickerTrigger} onPress={togglePicker}>
        <Text>
          {filters.category
            ? categoryItems.find((item) => item.value === filters.category)
                .label
            : "Select Category"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={filters.location}
        onChangeText={(value) => updateLocalFilters({ location: value })}
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
      {showPicker && (
        <Animated.View
          style={[
            styles.pickerContainer,
            { transform: [{ translateY: slideAnimation }] },
          ]}
        >
          <Picker
            selectedValue={filters.category}
            onValueChange={(itemValue) => {
              updateLocalFilters({ category: itemValue });
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
      )}
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
