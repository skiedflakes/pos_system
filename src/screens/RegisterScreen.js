import * as React from 'react';
import { Button, View,FlatList,TouchableOpacity,Dimensions,StyleSheet,Text, Alert} from 'react-native';

import AddProductModal from 'components/RegisterModal/AddProduct'

const {width, height} = Dimensions.get('window');
const DATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e295d72',
    product_name: 'Paracetamo123123l',
    price:50,
    quantity:1
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455571ne29d72',
    product_name: '2 Item',
    price:250, quantity:1
  },
  {
    id: '58694a0fv-3da1-471f-bd96-145571e29fd72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '5869c4a0f-3d2a1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '58694a0f-3d1a11xc-471f-bd96-145571e2f9d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '586944a0f-3da1-4713f-bd96-145571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },
];


const cart_data = [
  {
    id: '58694a0f-3da1-471f-34bd96-145571e295d72',
    product_name: 'Paracetamol',
    price:50,
    quantity:1
  },
  {
    id: '58694a0f-3da1-47341f-bd96-1455571e29d72',
    product_name: '2 Item',
    price:250, quantity:1
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '58694a0f-d3d2a1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '58694a0f-3d1a1-471f-bd96-14dfg5571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },  {
    id: '586944a0f-3da1-471f-bd9346-145571e29d72',
    product_name: 'Third Item',
    price:500, quantity:1
  },
];



export default function HomeScreen({ navigation }) {

  var count = 1;
  //get token on load page
  React.useEffect(() => {
    get_products()
  }, [count]); // Only re-run the effect if count changes




  //product
  const [product_list, setproduct_list] = React.useState([]);
  const [AddProductVisible, setAddProductVisible] = React.useState(false);
  const [selectedProduct, setselectedProduct] = React.useState([]);
  const [selectedquantity,setselectedquantity]=React.useState(1);

  //cartlist 
  const [cart_list, setcart_list] = React.useState([]);


  //settotal price
  const [total_price, settotal_price] = React.useState([]);


  const show_AddProduct = (item) =>{
    setAddProductVisible(true)
    setselectedProduct(item)
    console.log(item)
  }

  const hide_AddProduct = () =>{
    setAddProductVisible(false)
    setselectedquantity(1)
    var new_selected = {...selectedProduct,quantity:selectedquantity}
    setselectedProduct(new_selected);

  
    cart_list.push(new_selected);
    setcart_list(cart_list);

    //recompute
    compute_total_price()
  }
  
  const add_qty_AddProduct = () =>{
    setselectedquantity(selectedquantity+1)
  
    }
  
  const minus_qty_AddProduct = () =>{
      if(selectedquantity>1){
        setselectedquantity(selectedquantity-1)
      }else{
      
        console.log('cannot be zero')
      }
  }



  const compute_total_price = ()=>{
    var compute_total = cart_list.map(function(item,index){
        return {...item,subtotal:item.quantity*item.price}
    })

    var filtered_newData = compute_total.filter((e) => e != null);
    var final_total = filtered_newData
      .map((item) => item.subtotal)
      .reduce((prev, next) => +prev + +next);


  settotal_price(final_total)
  }


  //get data url

  const get_products = async () => {

      const formData = new FormData();
      formData.append('token', '12345');

      fetch(global.url+'get_products.php', {
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

            var new_array = responseJson.array_tags.map(function(item,index){
              return {id:item.product_id,product_name:item.product_code,expiry_date:item.expiry_date,price:item.price}
            })

            console.log(new_array)
            setproduct_list(new_array)
        })
        .catch((error) => {
       
          console.error(error);
          Alert.alert('Internet Connection Error');
        });

  };


  const nav_payment = () =>{
    if(cart_list.length>0){
      navigation.navigate('PaymentScreen',{cart_list:cart_list,total_price:total_price})
    }else{
      Alert.alert('Cart is empty')
    }
  
  }

    return (
      <View style={{ flex: 1,backgroundColor:'white' }}>

      {/* //modals */}
        <AddProductModal
          AddProductVisible={AddProductVisible}
          hide_AddProduct={hide_AddProduct}
          selectedProduct={selectedProduct}
          add_qty_AddProduct={add_qty_AddProduct}
          minus_qty_AddProduct={minus_qty_AddProduct}
          selectedquantity={selectedquantity}
          onChangeText={(value) =>setselectedquantity(value)}
        />
        <View style={{flex:0.1,backgroundColor:'white',borderWidth:1}}>
        </View>
        <View style={{flex:0.9,flexDirection:'row'}}>
          <View style={{flex:0.7,borderWidth:1}}>
          <FlatList
              numColumns={5}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'flex-start',
                alignSelf: 'center',
              }}
              data={product_list}
              renderItem={({item}) => (
                <RowItem
                 
                  item={item}
                  show_AddProduct={show_AddProduct}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
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
            <TouchableOpacity style={{flex:0.1,backgroundColor:'green',justifyContent:'center'}} onPress={()=>{nav_payment()}}>
              <Text style={{fontSize:35,color:'white',fontWeight:'bold',alignSelf:'center'}}>{total_price} PHP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}


function RowItem({  item,show_AddProduct}) {
  return (
    <TouchableOpacity
      onPress={() => {
       show_AddProduct(item)
      }}>
      <View style={custom_styles.item}>
        <View
          style={{
            flex:1,
          
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={custom_styles.normal}>{item.product_name}</Text>
          <Text style={custom_styles.normal}>{item.expiry_date}</Text>
        </View>

       
      </View>
    </TouchableOpacity>
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
