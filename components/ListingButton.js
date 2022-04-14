import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Listing  from '../screens/Listing';

const ListingButton = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('List')}>
    <View style = {styles.container}>
        <Icons name ="plus" color={COLORS.primary} size={35}/>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        borderColor : COLORS.primary,
        height: 60,
        width: 60,
        borderRadius: 40,
        borderWidth: 5,
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',


    }
});
export default ListingButton