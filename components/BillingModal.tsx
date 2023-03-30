import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export const BillingModal = () => {
  const [visible, setVisible] = useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginHorizontal: '5%'};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button onPress={() => setVisible(true)}>Show</Button>
    </Provider>
  );
};