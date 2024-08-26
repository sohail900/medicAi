import {
    collection,
    db,
    getDocs,
    orderBy,
    query,
    where,
    doc,
    auth,
    getDoc,
} from '../config/firebaseConfig'

/*
  # function used to get data from firebase
  # only login user can see their data
*/

// export const saveChatData = async (respondDoc: any, currentTitle: string) => {
//     try {
// 	console.log('the responsd doc is ', respondDoc)
// 	console.log('the current title is ', currentTitle)
//         const user_id = auth.currentUser?.uid
//         const chatCollection = collection(db, 'chat')
//         const q = query(
//             chatCollection,
//             where('currentTitle', '==', currentTitle),
//             where('user_id', '==', user_id)
//         )
//         const snapShot = await getDocs(q)
//         if (snapShot.empty) {
//             await addDoc(chatCollection, {
//                 user_id: user_id,
//                 currentTitle,
//                 respondDoc,
//                 timeStamp: new Date(),
//             })
//         } else {
//             const chatDoc = snapShot.docs[0]
//             const existingData = chatDoc.data()
//             const updatedDoc = [...existingData.respondDoc, ...respondDoc]
//             const docRef = doc(db, 'chat', chatDoc.id)
//             await updateDoc(docRef, { respondDoc: updatedDoc })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
export const getData = async (user_id: string) => {
    try {
        const chatCollection = collection(db, 'chat')
        const q = query(
            chatCollection,
            where('user_id', '==', user_id),
            orderBy('timeStamp', 'desc')
        )
        const snapShot = await getDocs(q)
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }))
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserSubscription = async () => {
    try {
        const userId = auth.currentUser?.uid
        if (userId) {
            const userDoc = await getDoc(doc(db, 'users', userId))
            if (userDoc.exists()) {
                console.log(userDoc.data())
                return userDoc.data()
            } else {
                console.log('No such document!')
            }
        } else {
            console.log('User not authenticated')
        }
    } catch (error) {
        console.error('Error fetching user subscription:', error)
        return null
    }
}
