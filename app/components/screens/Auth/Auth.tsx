import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native'
import React, { FC } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { STRINGS } from '../../../constants/strings'
import tw from 'twrnc'
import { useTokenStore } from '../../../store/tokenStore'
import { useCheckToken } from '../../../hooks/useCheckToken'
import { useNavigation } from '@react-navigation/native'

const Auth: FC = () => {

    const { token, setToken } = useTokenStore()
    const navigation = useNavigation()
    const { mutate, status } = useCheckToken()

    const navigateToPosts = async () => {
        mutate(token, {
            onSuccess: (data) => {
                console.log('Посты получены:', data);
                navigation.navigate('Posts');
            },
            onError: (data) => {
                console.log('Ошибка:', data);
                Alert.alert('Ошибка', 'Неверный токен или ошибка сети');
            },
        });
    }

    return (
        <DefaultLayout>
            <View style={{ ...tw`h-[50%] items-center justify-center`, paddingHorizontal: 30 }}>
                <TextInput
                    placeholderTextColor={"black"}
                    value={token}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={setToken}
                    placeholder={STRINGS.inputToken}
                    style={{ ...tw`bg-[#EAEAEC] font-medium rounded-[4] w-full p-4` }}
                />
                <View style={{ ...tw`w-full h-30 mt-14` }}>
                    {token.length > 10 ? <TouchableOpacity
                        disabled={status === 'pending'}
                        style={{ ...tw`w-full` }}
                        onPress={navigateToPosts}>
                        <View style={{ ...tw`bg-[#3c3cb3] rounded-[4] w-full p-4 items-center justify-center` }}>
                            {status === 'pending' ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ ...tw`text-white font-medium` }}>{STRINGS.buttonContinue}</Text>}
                            {/* <Text style={{ ...tw`text-white font-medium` }}>{STRINGS.buttonContinue}</Text> */}
                        </View>
                    </TouchableOpacity> : null}
                </View>
            </View>
        </DefaultLayout>
    )
}

export default Auth