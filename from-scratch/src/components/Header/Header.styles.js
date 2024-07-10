import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 0,
  },
  row: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
  textContainer: {
    padding: 20,
    marginTop: 40,
    '@media (min-width: 768px)': {
      padding: 40,
      marginTop: 60,
    },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textPrimary: {
    color: '#00B98E',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#00B98E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    '@media (min-width: 768px)': {
      height: 350,
    },
  },
});
