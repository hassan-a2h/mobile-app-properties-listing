import { StyleSheet } from "react-native";

export default StyleSheet.create({
  footer: {
    backgroundColor: '#333',
    color: '#aaa',
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    color: '#aaa',
    marginBottom: 10,
  },
  link: {
    color: '#aaa',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  photoGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    width: '30%',
    margin: '1%',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 2,
  },
  newsletterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 5,
    padding: 5,
  },
  newsletterInput: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  newsletterButton: {
    backgroundColor: '#00B98E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  newsletterButtonText: {
    color: '#fff',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 10,
  },
  copyrightText: {
    color: '#aaa',
    textAlign: 'center',
  },
  footerMenu: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'end',
    marginTop: 10,
  },
  footerMenuLink: {
    color: '#aaa',
    marginHorizontal: 10,
  },
});