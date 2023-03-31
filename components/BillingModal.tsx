import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

import { getSubscriptionPlans } from '../helpers/billing';

export const BillingModal = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [plans, setPlans] = useState([]);
  const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginHorizontal: '5%'};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#555',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#FEFEFE'
    },
    plansContainer: {
      flexDirection: 'row',
    },
    plan: {
      width: '40%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    planTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    planPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    planDescription: {
      fontSize: 16,
      marginBottom: 20,
    },
    planButton: {
      backgroundColor: '#4b74ff',
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    planButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
  });

  useEffect( () => {
    getSubscriptionPlans().then( (plans) => {
      setPlans(plans);
    });
  }, [])

  return (
    <Provider>
      <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          {/* <View style={styles.container}> */}
            <Text style={styles.title}>Premium Plan</Text>
            <View style={styles.plansContainer}>
          {plans.map((plan) => (
              <View style={styles.plan} key={plan.identifier}>
                <Text style={styles.planTitle}>{plan.product.title}</Text>
                <Text style={styles.planPrice}>{plan.product.priceString}</Text>
                <Text style={styles.planDescription}>{plan.product.description}</Text>
                <TouchableOpacity style={styles.planButton}>
                  <Text style={styles.planButtonText}>Purchase</Text>
                </TouchableOpacity>
              </View>
          ))}
            </View>
          {/* </View> */}
        </Modal>
      </Portal>
      <Button onPress={() => setVisible(true)}>Show</Button>
    </Provider>
  );
};