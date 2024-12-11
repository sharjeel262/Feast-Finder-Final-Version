import { StyleSheet, Image, ScrollView } from 'react-native';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function PizzaComponent ({productprops}){
//   console.log('productprops', productprops.length);
  return(
    // JSX
    <View style={styles.container}>
        {/* <ScrollView>
        {productprops.map((data)=>{
            return(
                <View>
                <ScrollView>
                <Image  
                    source = {{uri:data.image}} 
                    style={styles.image}
                />
                <Text style={styles.name}> {data.name} </Text>
                <Text style={styles.name}> {data.price} </Text>
                </ScrollView>
                </View>
            )
        })}
      </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
      width:'100%', 
      aspectRatio:2/1
  },
  name:{
    fontSize:42
  }
});
