import { View, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { FC, Fragment, PropsWithChildren } from 'react'
import tw from 'twrnc'

export const styleCenter = tw`w-full h-full bg-white`

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F2F3' }}>
            <StatusBar barStyle="dark-content" backgroundColor='transparent' />
            <View style={{ ...styleCenter, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default DefaultLayout