import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function MyPizzaComponent({MyProduct}){

    console.log(MyProduct[4]);

    return(
    <View style = {{flex:'0.95'}}>
     <ScrollView>

    {
        MyProduct.map((data)=>{
            return(
                <View>
                <Image  
                    source = {{uri:data.image}} 
                    style={styles.image}
                />
                <Text style={styles.name}> {data.name} </Text>
                <Text style={styles.name}> {data.price} </Text>
                </View>
            )
        })
    }
        </ScrollView>
    </View>
    )
  }

  const styles = StyleSheet.create({
    image:{
      width:'100%', 
      aspectRatio:2/1
    },
    name:{
    fontSize:42
    }
    });
