import React from "react";
import { View ,Text} from "react-native";

export function Treinos({route}: {route: any}){
    const {id} = route.params;
    return(
        <View style={{flex:1,justifyContent:"center",backgroundColor:"red"}}
        ><Text>Toma no seu cu{id}</Text></View>)
}