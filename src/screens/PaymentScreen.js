import * as React from 'react';
import { Button, View,FlatList,TouchableOpacity,Dimensions,StyleSheet,Text, Alert} from 'react-native';

const {width, height} = Dimensions.get('window');



export default function HomeScreen({navigation,route}) {
  const {cart_list,total_price} = route.params;


  const save_products = async () => {

    var d = new Date();
var mili = d.getMilliseconds();
var sec = d.getSeconds();
var min = d.getMinutes();
var rnd_time = min+''+sec+''+mili;

    const formData = new FormData();
    formData.append('invoice','RS-'+rnd_time);
    formData.append('cashier','cashier1');
    formData.append('date','2021-04-14');
    formData.append('amount',total_price);
   
    fetch(global.url+'savesales.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
  
        if(responseJson.status==1){
   
            cart_list.map(function(item,index){
                var subtotal = item.quantity*parseFloat(item.price);
                var len = index+1;
                save_sales_order(item.id,rnd_time,item.quantity,item.price,subtotal,len)
            })



        }else{

        }
            
      })
      .catch((error) => {
     
        console.error(error);
        Alert.alert('Internet Connection Error');
      });
};


const save_sales_order =async(product_id,rnd_time,quantity,price,subtotal,index) => {
    const formData = new FormData();
    formData.append('invoice','RS-'+rnd_time);
    formData.append('quantity',quantity);
    formData.append('amount',subtotal);
    formData.append('product_id',product_id);   
    formData.append('price',price);
    formData.append('date','2021-04-14');

    fetch(global.url+'savesales_order.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.status==1){
                if(cart_list.length==index){
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'RegisterScreen' }],
                      });
                }
            }
       
      })
      .catch((error) => {
     
        console.error(error);
        Alert.alert('Internet Connection Error');
      });
};

    return (
      <View style={{ flex: 1,backgroundColor:'white' }}>

        <View style={{flex:0.1,backgroundColor:'white',borderWidth:1}}>
        </View>
        <View style={{flex:0.9,flexDirection:'row'}}>

        <View style={{flex:0.3,borderWidth:1}}>
            <View style={{flex:0.9}}>
            <FlatList
              data={cart_list}
              renderItem={({item}) => (
                <CartItem
                  item={item}
                />
              )}
              keyExtractor={item => item.id}
            />
            </View>

          </View>
          <View style={{flex:0.7,borderWidth:1,justifyContent:'center',paddingHorizontal:20}}>
                <Text style={{fontSize:70,fontWeight:'bold',textAlign:'center',padding:20, color:'#246d91'}}>
                   {total_price} <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center',padding:20}}>
                   PHP
                </Text>
                </Text>
                <TouchableOpacity style={{backgroundColor:'#2dba5c',marginHorizontal:100}} onPress={()=>{save_products()}}>
                <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center',color:'white',padding:10}}>
                   Save
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#eb4034',marginHorizontal:100,marginTop:25}} onPress={()=>{navigation.goBack()}}>
                <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center',color:'white',padding:10}}>
                   Cancel
                </Text>
                </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );
}




function CartItem({item}) {
  return (
    <TouchableOpacity
      onPress={() => {
  
      }}>
      <View style={custom_styles.Cartitem}>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

          }}>
          <Text style={custom_styles.normal}>{item.product_name}</Text>
          <Text style={custom_styles.normal}>  {item.quantity} x</Text>
          <Text style={custom_styles.normal}>  {item.quantity*item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const custom_styles = StyleSheet.create({

  item: {
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#bfbcbb',
    alignContent: 'center',
    alignItems: 'center',
    width: 0.11725293132328309 * width,
    height: 0.11725293132328309 * width,
    margin: 7,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },

  normal: {
    fontSize: (15 / height) * height,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    textAlign: 'left',
    fontWeight:'bold'
  },  Cartitem: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
 
});
