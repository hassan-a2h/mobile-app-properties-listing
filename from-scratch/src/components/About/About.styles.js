import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    padding: 5,
    paddingRight: 0,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkIcon: {
    color: 'white',
  },
});