import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  bgLight: {
    backgroundColor: 'rgba(0, 185, 142, .1)',
    borderRadius: 10,
    padding: 15,
  },
  bgWhite: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 185, 142, .3)',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingRight: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  textWrapper: {
    marginTop: 31,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  buttonPrimary: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#00B98E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonDark: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  }
});