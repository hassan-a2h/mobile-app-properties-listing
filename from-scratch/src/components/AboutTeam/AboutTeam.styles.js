import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
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
      fontSize: 16,
      color: 'gray',
  },
  agentList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
  },
  agentCard: {
      width: '48%',
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
      overflow: 'hidden',
      borderColor: '#ddd',
      borderWidth: 1,
  },
  agentImage: {
      width: '100%',
      height: 150,
  },
  socialIcons: {
      flexDirection: 'row',
      gap: 18,
      justifyContent: 'center',
      marginTop: -15,
      backgroundColor: '#fff',
      paddingVertical: 10,
  },
  agentInfo: {
      alignItems: 'center',
      padding: 10,
  },
  agentName: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  agentRole: {
      fontSize: 14,
      color: 'gray',
  },
});