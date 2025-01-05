// import { View, Text, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams, useNavigation } from 'expo-router'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import BusinessListCard from '../../components/BusinessList/BusinessListCard'

// export default function BusinessListByCategory() {
//   const navigation=useNavigation()
//   const {category}=useLocalSearchParams()
//   const [businessList, setBusinessList] = useState([])
//   useEffect(() => {
//     navigation.setOptions({
//         headerShown:true,
//         headerTitle:category
//     })
//     getBusinessList()
//   }, [])
  
//   const getBusinessList=async()=>{
//     const q=query(collection(db,'BusinessList'),where("category","==",category))
//     const querySnapshot=await getDocs(q)

//     querySnapshot.forEach((doc)=>{
//         console.log(doc.data())
//         setBusinessList((prev) => [...prev, doc.data()]);
//     })
// }
//     return (
//     <View>
//       <FlatList
//               data={businessList}
//               renderItem={({ item, index }) => (
//                 <BusinessListCard key={index} business={item} />
//               )}
//             />
//     </View>
//   )
// }

import { View, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, [category]);

  const getBusinessList = async () => {
    if (!category) {
      console.error("Category is undefined or empty.");
      return;
    }

    try {
      const q = query(
        collection(db, 'BusinessList'),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching business list:", error);
    }
  };

  return (
    <View>
      {businessList?.length>0? <FlatList
        data={businessList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BusinessListCard business={item} />}
      />:
      <Text style={{
        fontSize:20,
        fontFamile:'outfit-bold',
        color:Colors.GRAY,
        textAlign:'center',
        marginTop:'50%'
      }}>No Business Found</Text>}
    </View>
  );
}
