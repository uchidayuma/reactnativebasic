import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, Button, Card, Title, Paragraph, Provider } from 'react-native-paper';

import { getSubscriptionPlans, purchaseSubscription } from '../helpers/billing';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export const BillingModal = () => {
  const colorScheme = useColorScheme()
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [plans, setPlans] = useState([]);
  const containerStyle = {backgroundColor: '#EEEEEE', padding: 20};
  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: Colors[colorScheme].text, 
    },
    plan: {
      width: '80%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: '10%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    planTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    planButton: {
      color: Colors[colorScheme].text,
      backgroundColor: Colors[colorScheme].mainColor,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginBottom: 20,
    },
    planButtonText: {
      color: '#ffffff',
      fontSize: 16,
      marginBottom: 10,
    },
  });

  useEffect( () => {
    getSubscriptionPlans().then( (plans) => {
      console.log(plans);
      setPlans(plans);
    });
  }, [])

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View>
            <Card style={styles.plan}>
              <Card.Content>
                <Title style={styles.title}>Premium Plan</Title>
                <Paragraph style={styles.planTitle}>Please select a monthly or annual plan.</Paragraph>
                <Paragraph style={styles.planTitle}>ADfree & Backup</Paragraph>
          {plans.map((plan) => (
                <TouchableOpacity style={styles.planButton} onPress={() => purchaseSubscription(plan)}>
                  <Text style={styles.planButtonText}>{plan.product.title}</Text>
                  <Text style={[styles.planButtonText, {textAlign: 'center'}]}>{plan.product.priceString}</Text>
                </TouchableOpacity>
          ))}
              </Card.Content>
              <Card.Actions style={{ justifyContent: 'center', margin: 20 }}>
                <Button onPress={hideModal}>Cancel</Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      </Portal>
      <Button onPress={() => setVisible(true)}>Show</Button>
    </Provider>
  );
};