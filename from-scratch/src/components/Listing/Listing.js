import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./Listing.styles";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import propertyImg from "../../../assets/img/property-1.jpg";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import ListingFilter from "../ListingFilter";

const Listing = ({ route, initialLimit = 4, calledFrom }) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastListingDate, setLastListingDate] = useState(null);

  const navigation = useNavigation();
  const { user } = useAuth();
  const { setNewChat } = useChat();
  const userId = user?.id;

  useEffect(() => {
    setListings([]);
    setLastListingDate(null);
    setHasMore(true);
    fetchListings();
  }, [route?.params, navigation]);

  useLayoutEffect(() => {
    if (route?.params?.name) {
      navigation.setOptions({ title: route.params.name });
    }
  }, [navigation, route?.params?.name]);

  const handleEdit = (id) => {
    navigation.navigate("Create Listing", { id, editing: true });
  };

  const fetchListings = useCallback(
    async (lastDate = null, fromDelete = false) => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      const requestParams = {
        limit: initialLimit,
        lastListingDate: lastDate,
      };

      console.log("Listing component, params: ", route?.params);

      if (route?.params?.fromUser) requestParams.agentId = userId;
      if (route?.params?.category)
        requestParams.category = route.params.category;

      try {
        const response = await axios.get("/api/listings", {
          params: requestParams,
        });
        const newListings = response.data;

        if (fromDelete) {
          setListings(newListings);
        } else {
          setListings((prevListings) => [...prevListings, ...newListings]);
        }

        setHasMore(newListings.length === initialLimit);

        if (newListings.length > 0) {
          setLastListingDate(newListings[newListings.length - 1].createdAt);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        Toast.show({ type: "error", text1: "Error fetching listings." });
      } finally {
        setIsLoading(false);
      }
    },
    [initialLimit, route?.params, userId, isLoading, hasMore]
  );

  const loadMoreListings = () => {
    if (listings.length > 0) {
      fetchListings(lastListingDate);
    }
  };

  const handleDelete = async (id, postedBy) => {
    if (
      user.role !== "admin" &&
      user.role !== "agent" &&
      postedBy !== user.id
    ) {
      console.log("Can't delete other user's listing");
      return;
    }

    try {
      await axios.delete(`/api/listings/${id}`);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== id)
      );
      Toast.show({ type: "success", text1: "Listing deleted successfully" });
    } catch (error) {
      console.error("Error deleting listing:", error);
      Toast.show({ type: "error", text1: "Error deleting listing." });
    }
  };

  const handleContact = async (listing) => {
    try {
      const response = await axios.post("/api/c/chat", {
        userId,
        agentId: listing.postedBy,
        listingId: listing._id,
        propertyTitle: listing._id,
      });
      const chat = response.data;
      setNewChat(chat);
      navigation.navigate("Chats");
    } catch (error) {
      console.error("Error creating or fetching chat:", error);
    }
  };

  const renderListingItem = ({ item: listing }) => (
    <View style={styles.listingItem} key={listing._id}>
      <View style={styles.imageContainer}>
        <Image source={propertyImg} style={styles.image} />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>For Sale</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{listing.status}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.priceText}>${listing.price}</Text>
        <Text style={styles.titleText}>{listing.title.slice(0, 22)}</Text>
        <Text style={styles.descriptionText}>{listing.description}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionText}>1000 Sqft</Text>
        {listing.postedBy === userId && (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(listing._id)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="create-outline" size={16} color="#00B98E" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, styles.deleteButton]}
              onPress={() => handleDelete(listing._id, listing.postedBy)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
              <Ionicons name="trash-outline" size={16} color="red" />
            </TouchableOpacity>
          </>
        )}
        {listing.postedBy !== userId && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContact(listing)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      {listings.length > 0 && (
        <View>
          {calledFrom !== "home" && calledFrom !== "categoryTab" && (
            <ListingFilter />
          )}
        </View>
      )}
      {listings.length === 0 && !isLoading && (
        <View style={styles.noListings}>
          <Text style={styles.noListingsText}>No Properties Listed</Text>
        </View>
      )}
    </>
  );

  const renderFooter = () =>
    isLoading ? <Text style={styles.loadingText}>Loading...</Text> : null;

  return (
    <FlatList
      data={listings}
      renderItem={renderListingItem}
      keyExtractor={(item) => item._id}
      onEndReached={loadMoreListings}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      style={styles.container}
    />
  );
};

export default Listing;
