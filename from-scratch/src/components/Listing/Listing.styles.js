import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#00B98E',
    borderRadius: 5,
    padding: 10,
  },
  activeFilter: {
    color: '#fff',
    backgroundColor: '#00B98E',
  },

  filterButtonTextActive: {
    color: '#fff',
  },
  filterButtonText: {
    color: '#00B98E',
  },
  listingsContainer: {
    flex: 1,
  },
  listingItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#00B98E',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  badgeText: {
    color: 'white',
  },
  statusContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    color: '#00B98E',
  },
  detailsContainer: {
    padding: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00B98E',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionText: {
    color: 'gray',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  actionText: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#00B98E',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRightWidth: 1,
  },
  editButtonText: {
    color: '#00B98E',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRightWidth: 1,
  },
  deleteButtonText: {
    textAlign: 'center',
    color: 'red',
  },
  contactButton: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#00B98E',
  },
  contactButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  noListings: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noListingsText: {
    fontSize: 18,
    color: 'gray',
  },
});