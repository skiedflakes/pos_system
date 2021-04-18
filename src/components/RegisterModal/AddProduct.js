import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from "react-native";
export default function AddProduct(props){


return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.AddProductVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.selectedProduct.product_name}</Text>

          <TextInput  style={styles.modalText}  onChangeText={props.onChangeText}>{props.selectedquantity}</TextInput>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:20,width:300}}>
          <TouchableOpacity
                style={styles.button_minus}
                onPress={() =>props.minus_qty_AddProduct()}
            >
            <Text style={styles.textStyle2}>-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
                style={styles.button_plus}
                onPress={() => props.add_qty_AddProduct()}
            >
            <Text style={styles.textStyle2}>+</Text>
          </TouchableOpacity>
          </View>
        


            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.hide_AddProduct()}
            >
            <Text style={styles.textStyle}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
)
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor:'rgba(191, 188, 187, 0.6)',
    },
    modalView: {
      width:300,
      height:300,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10, paddingHorizontal:50,
      elevation: 2
    },
    button_plus: {
        borderRadius: 10,
        padding: 10,    paddingHorizontal:50,
        elevation: 2,
        backgroundColor:'#4AE664'
      },
      button_minus: {
        borderRadius: 10,
        padding: 10,
        paddingHorizontal:50,
        elevation: 2,backgroundColor:'#E5654A'
      },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center" , fontSize:20
    },
    textStyle2: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center" , fontSize:30
      },
  
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize:20
    }
  });