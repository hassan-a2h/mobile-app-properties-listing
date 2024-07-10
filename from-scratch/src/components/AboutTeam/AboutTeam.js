import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import styles from './AboutTeam.styles';
import Toast from 'react-native-toast-message';

import team1 from '../../../assets/img/team-1.jpg';
import team2 from '../../../assets/img/team-2.jpg';
import team3 from '../../../assets/img/team-3.jpg';
import team4 from '../../../assets/img/team-4.jpg';

const AboutTeam = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agentsErrors, setAgentsErrors] = useState({});

    useEffect(() => {
        async function fetchAgents() {
            try {
                const agentsData = await axios.get('/api/users/agents');
                if (agentsData.data.length > 0) {
                    setAgents(agentsData.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setAgentsErrors(error);
                console.error('Error fetching agents');
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching Agents.',
                });
            }
        }
        fetchAgents();
    }, []);

    // Helper functions
    function getImage(index) {
        const images = [team1, team2, team3, team4];
        return images[index % 4];
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#00B98E" />
            ) : (
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>Property Agents</Text>
                        <Text style={styles.subtitle}>
                            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
                        </Text>
                    </View>
                    <View style={styles.agentList}>
                        {agents.map((agent, index) => {
                            const social = agent.socialMedia[0];
                            return (
                                <View key={agent._id} style={styles.agentCard}>
                                    <Image source={getImage(index)} style={styles.agentImage} />
                                    <View style={styles.socialIcons}>
                                        {social?.facebookUrl && (
                                            <TouchableOpacity onPress={() => Linking.openURL(social.facebookUrl)}>
                                                <FontAwesome name="facebook-f" size={20} color="#4267B2" />
                                            </TouchableOpacity>
                                        )}
                                        {social?.twitterUrl && (
                                            <TouchableOpacity onPress={() => Linking.openURL(social.twitterUrl)}>
                                                <FontAwesome name="twitter" size={20} color="#1DA1F2" />
                                            </TouchableOpacity>
                                        )}
                                        {social?.instagramUrl && (
                                            <TouchableOpacity onPress={() => Linking.openURL(social.instagramUrl)}>
                                                <FontAwesome name="instagram" size={20} color="#C13584" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={styles.agentInfo}>
                                        <Text style={styles.agentName}>{agent.name}</Text>
                                        <Text style={styles.agentRole}>Dealer</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default AboutTeam;
