import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";

// Define Yup schema
const ListingSchema = Yup.object().shape({
  title: Yup.string().min(8).max(64).required("Title is required"),
  description: Yup.string().min(4).max(512).required("Description is required"),
  price: Yup.number().min(1000).max(50000000).required("Price is required"),
  location: Yup.string().min(8).max(128).required("Location is required"),
  status: Yup.string().required("Status is required"),
  category: Yup.string().required("Category is required"),
});

const ListingForm = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { id, editing } = route.params || {};

  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: "",
    status: "available", // Set a default value
    postedBy: user?.id,
    category: "home",
  });

  const statusItems = [
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
  ];

  const categoryItems = [
    { label: "Home", value: "home" },
    { label: "Villa", value: "villa" },
    { label: "Apartment", value: "apartment" },
    { label: "Building", value: "building" },
    { label: "Office", value: "office" },
    { label: "Townhouse", value: "townhouse" },
    { label: "Shop", value: "shop" },
    { label: "Garage", value: "garage" },
  ];

  useEffect(() => {
    if (editing && id) {
      fetchListing(id);
    }
  }, [editing, id]);

  const fetchListing = async (id) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      console.log(
        "listing received from server:",
        response.data,
        "\nuserId:",
        user
      );
      if (response.data.postedBy !== user.id) {
        navigation.navigate("Home");
        return;
      }
      setInitialValues(response.data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      Toast.show({ type: "error", text1: "Error fetching listing." });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={ListingSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            if (editing) {
              await axios.put(`/api/listings/${id}`, values);
              Toast.show({
                type: "success",
                text1: "Listing updated successfully.",
              });
            } else {
              await axios.post("/api/listings", values);
              Toast.show({
                type: "success",
                text1: "Listing created successfully.",
              });
            }
            navigation.navigate("My Listings", {
              userId: user.id,
              fromUser: true,
            });
          } catch (error) {
            console.error("Error saving listing:", error);
            const errors = error?.response?.data?.errors;
            if (errors) {
              setErrors(errors);
              Object.values(errors).forEach((errorMessage) => {
                Toast.show({ type: "error", text1: errorMessage });
              });
            } else {
              Toast.show({ type: "error", text1: "Error saving listing." });
            }
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              placeholder="Enter title"
            />
            {errors.title && touched.title ? (
              <Text style={styles.error}>{errors.title}</Text>
            ) : null}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholder="Enter description & contact details"
              multiline
            />
            {errors.description && touched.description ? (
              <Text style={styles.error}>{errors.description}</Text>
            ) : null}

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price.toString()}
              placeholder="Enter price"
              keyboardType="numeric"
            />
            {errors.price && touched.price ? (
              <Text style={styles.error}>{errors.price}</Text>
            ) : null}

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              placeholder="Enter location"
            />
            {errors.location && touched.location ? (
              <Text style={styles.error}>{errors.location}</Text>
            ) : null}

            <Text style={styles.label}>Status</Text>
            <DropDownPicker
              open={openStatus}
              value={values.status}
              items={statusItems}
              setOpen={setOpenStatus}
              setValue={(val) => setFieldValue("status", val)}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select Status"
              zIndex={2000}
              zIndexInverse={1000}
            />
            {errors.status && touched.status ? (
              <Text style={styles.error}>{errors.status}</Text>
            ) : null}

            <Text style={styles.label}>Category</Text>

            <DropDownPicker
              open={openCategory}
              value={values.category}
              items={categoryItems}
              setOpen={setOpenCategory}
              setValue={(val) => setFieldValue("category", val)}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select Category"
              zIndex={1000}
              zIndexInverse={2000}
            />
            {errors.category && touched.category ? (
              <Text style={styles.error}>{errors.category}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {editing ? "Update Listing" : "Add Listing"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  textArea: {
    height: 120,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdownContainer: {
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  error: {
    color: "#ff3b30",
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#00B98E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ListingForm;
