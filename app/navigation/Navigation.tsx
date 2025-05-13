import React, { FC, useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import Auth from "../components/screens/Auth/Auth";
import Posts from "../components/screens/Posts/Posts";

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {

    const ref = useNavigationContainerRef()

    return (
        <NavigationContainer ref={ref}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Posts" component={Posts} />
                <Stack.Screen name="Auth" component={Auth} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation