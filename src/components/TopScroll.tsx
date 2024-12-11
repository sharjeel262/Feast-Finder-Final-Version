import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function TopScroll(){

    return(
    <View style={{flex:'0.05', flexDirection:'row',backgroundColor:'green'}}>
        <View style={{flex:0.333, backgroundColor:'red'}}>
        <Text> We</Text>
        </View>
        <View style={{flex:0.333, backgroundColor:'green'}}>
        <Text> We</Text>
        </View>
        <View style={{flex:0.333, backgroundColor:'blue'}}>
        <Text> We</Text>
        </View>
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
