import React , {Component} from 'react'
import { SafeAreaView, Text, StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native";
import { RectButton } from '../components';
import { SIZES } from '../constants';
import {FocusedStatusBar } from "../components";
import { COLORS} from "../constants";
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';




const NewListing = () => {
  return (
      <SafeAreaView style={{flex:1,justifyContent: "center",alignItems: "center"}}>
          <FocusedStatusBar backgroundColor={COLORS.primary} />
          <View >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '110%',
                backgroundColor: '#2e64e515'
              }}>
                <TextInput style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                  textAlign: 'center',
                  width: '90%',
                  marginBottom: 15
                }}
                  placeholder="What's on your mind?"
                  multiline
                  numberOfLines={4}
                >

                </TextInput>
              </View>
            </TouchableWithoutFeedback>
            {/* <RectButton
              minWidth={20}
              fontSize={SIZES.font}
              handlePress={() => navigation.navigate("LogIn", {navigation})}
            /> */}
            <View>
              <RectButton
                  text="Confirm"
                  minWidth={50}
                  fontSize={25}
                  borderRadius={10}
              />
            </View>
            <ActionButton buttonColor="rgba(231,76,60,1)" style={{bottom:50}}>
              <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => console.log("Take photo button tapped!")}>
                <Icon name="camera-outline" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={() => {}}>
                <Icon name="md-images-outline" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default NewListing;