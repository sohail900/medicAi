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
    storage,
} from '../config/firebaseConfig'
import { listAll, ref, getDownloadURL, uploadBytes } from 'firebase/storage'
/*
  # function used to get data from firebase
  # only login user can see their data
*/

// export const saveChatData = async (ai_response: any, currentTitle: string,user_id:string) => {
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
//                 respondDoc:ai_response,
//                 timeStamp: new Date(),
//             })
//         } else {
//             const chatDoc = snapShot.docs[0]
//             const existingData = chatDoc.data()
//             const updatedDoc = [...existingData.respondDoc, ...ai_response]
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
            const userDoc = await getDoc(doc(db, 'subscriptions', userId))
            if (userDoc.exists()) {
                return userDoc.data()
            } else {
                console.log('No such document!')
            }
        } else {
            console.log('No authenticated user!')
        }
    } catch (error) {
        console.error('Error fetching user subscription:', error)
    }
    return null
}
export const getUser = async (uid: string) => {
    const userRef = doc(db, 'users', uid)
    // Fetch the document with specific fields
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
        // Extract only the name and email fields
        const data = docSnap.data()
        return { name: data.name, email: data.email }
    }
    console.log('no! user found')
}

export const getContent = async () => {
    try {
        const collectionRef = collection(db, 'content')
        const heroRef = doc(collectionRef, 'hero')
        const footerRef = doc(collectionRef, 'footer')
        const colorRef = doc(collectionRef, 'color')

        const footerContent = await getDoc(footerRef)
        const heroContent = await getDoc(heroRef)

        await getDoc(colorRef)
        // create variable for primary color
        // project needs (used dynamic color)
        return {
            footer: footerContent?.data()?.copyright,
            hero: heroContent?.data()?.message,
        }
    } catch (error) {
        console.log(error)
    }
}

export const getLogo = async () => {
    try {
        const storageRef = ref(storage, 'logo')
        const lists = await listAll(storageRef)
        if (lists.items.length > 0) {
            const logoUrl = await getDownloadURL(lists.items[0])
            return logoUrl
        }
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (file: File) => {
    try {
        // Create a reference to the location where we want to upload the file
        const storageRef = ref(storage, `uploads/${file.name}`)

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file)

        // Get the download URL for the uploaded file
        await getDownloadURL(snapshot.ref)
    } catch (error) {
        console.error('Error uploading file:', error)
        throw error
    }
}
