import app from '../lib/firebase'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const imageUpload = async (file) => {
  const fileName = new Date().getTime() + file.name
  const storage = getStorage(app)
  const storageRef = ref(storage, fileName)

  try {
    const uploadTask = await uploadBytesResumable(storageRef, file)

    let downloadURL = await getDownloadURL(uploadTask.ref)

    return downloadURL
  } catch (error) {
    return false
  }

  // // Register three observers:
  // // 1. 'state_changed' observer, called any time the state changes
  // // 2. Error observer, called on failure
  // // 3. Completion observer, called on successful completion
  // uploadTask.on(
  //   'state_changed',
  //   (snapshot) => {
  //     // Observe state change events such as progress, pause, and resume
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     console.log('Upload is ' + progress + '% done')
  //     switch (snapshot.state) {
  //       case 'paused':
  //         console.log('Upload is paused')
  //         break
  //       case 'running':
  //         console.log('Upload is running')
  //         break
  //       default:
  //     }
  //   },
  //   (error) => {
  //     // Handle unsuccessful uploads
  //     return false
  //   },
  //   () => {
  //     // Handle successful uploads on complete
  //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       console.log('returned url')
  //       // Call API with state
  //       return downloadURL
  //     })
  //   }
  // )
}

export default imageUpload
