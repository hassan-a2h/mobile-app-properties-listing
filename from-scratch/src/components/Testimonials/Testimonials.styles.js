import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 600,
  },
  testimonialItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  testimonialContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 185, 142, 0.3)',
    padding: 15,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  clientImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  clientText: {
    marginLeft: 10,
  },
  clientName: {
    fontWeight: 'bold',
  },
  clientProfession: {
    fontSize: 12,
  },
});