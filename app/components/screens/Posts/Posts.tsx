import { View, Text, Image, ActivityIndicator, Alert, Touchable, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import tw from 'twrnc'
import { COLORS } from '../../../constants/colors'
import { useTokenStore } from '../../../store/tokenStore'
import { usePosts } from '../../../hooks/usePosts'
import { useNavigation } from '@react-navigation/native'
import { Items } from '../../../types/postsTypes'
import DefaultLayout from '../../layouts/DefaultLayout'
import { STRINGS } from '../../../constants/strings'

const Posts: FC = () => {

  const COUNT_POSTS = 10;

  const navigation = useNavigation()
  const token = useTokenStore(state => state.token);

  const [count, setCount] = useState(COUNT_POSTS);
  const { data, isLoading, isFetching, isError } = usePosts(token, count);

  const previousData = useRef<Items[]>([]);
  const posts: Items[] = data ?? previousData.current;

  useEffect(() => {
    if (data) previousData.current = data;
  }, [data]);

  const handleEndReached = () => {
    if (!isFetching && data && data.length >= count) {
      setCount((prev) => prev + COUNT_POSTS);
    }
  };

  if (isLoading) return <ActivityIndicator style={{ ...tw`flex-1` }} size="large" />

  if (isError) {
    navigation.navigate('Auth')
    Alert.alert(STRINGS.errorTitle, STRINGS.errorTokenValidateDescription);
  }

  return (
    <DefaultLayout>
      <View style={{ ...tw`flex-1`, padding: 16, backgroundColor: COLORS.whitetheme }}>
        <FlashList
          data={posts}
          estimatedItemSize={100}
          disableAutoLayout={true}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                backgroundColor: 'white',
                borderRadius: 8,
                marginBottom: 22,
              }}
            >
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                {item.user.firstName} {item.user.lastName}
              </Text>
              {item.message && <Text>{item.message}</Text>}
              {item.union?.description &&
                <Text style={{ marginTop: 6 }}>
                  {item.union.description}
                </Text>
              }
              {item.photos &&
                <Image
                  source={{ uri: item.photos.map(photo => photo.photo.original)[0] }}
                  style={{
                    ...tw`items-center, justify-center mt-6`, aspectRatio: 1, resizeMode: 'contain',
                    flex: 1,
                  }}
                />}
            </View>
          )}
          ListFooterComponent={
            isFetching ? <ActivityIndicator style={{ margin: 10 }} size="small" color="gray" /> : null
          }
        />
      </View>
    </DefaultLayout>
  )
}

export default Posts