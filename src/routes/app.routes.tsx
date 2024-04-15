import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home} from "../pages/home";
import { Treinos } from "../pages/treinos";


const Stack = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Treinos" component={Treinos} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}