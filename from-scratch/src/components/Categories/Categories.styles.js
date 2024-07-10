import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
    padding: 10,
  },
  categoryContent: {
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});