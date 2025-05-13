import { View, Text } from 'react-native'
import React, { FC } from 'react'
import jsonviewer from '../../../constants/jsonviewer.json'
import { FlashList } from '@shopify/flash-list'
import tw from 'twrnc'
import { COLORS } from '../../../constants/colors'

const Posts: FC = () => {
  return (
    <View style={{ ...tw`flex-1`, padding: 16, backgroundColor: COLORS.whitetheme }}>
      <FlashList
        data={jsonviewer.data.items}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: '#E5E5E5',
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.user.firstName}</Text>
            <Text>{item.user.lastName}</Text>
          </View>
        )}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Posts