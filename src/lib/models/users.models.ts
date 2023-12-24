import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  description: string;
  image: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

class UserModel {
  async updateUserProfile({
    id,
    username,
    email,
    description,
    image,
    website,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube
  }: UserProfile): Promise<void> {
    const docRef = doc(collection(db, "users"), id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        id,
        username,
        email,
        description,
        image,
        website,
        facebook,
        twitter,
        instagram,
        linkedin,
        youtube
      });
    } else {
      if (image !== "") {
        await updateDoc(docRef, {
          id,
          username,
          email,
          description,
          image,
          website,
          facebook,
          twitter,
          instagram,
          linkedin,
          youtube
        });
      } else {
        await updateDoc(docRef, {
          id,
          username,
          email,
          description,
          website,
          facebook,
          twitter,
          instagram,
          linkedin,
          youtube
        });
      }
    }
  }
  async getUserProfile(id:string) {
    const docRef = doc(collection(db, "users"), id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) return docSnap.data();
    else{
      console.log("Document doesn't exist.");
      return null;
    }
  }
  async updateAvatar(id: string, url: any) {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      image: url,
    });
  }
  async deleteOldAvatar(id: string) {
    const storageRef = ref(storage, `avatarImages/${id}`);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
  async uploadAvatar(id: string, file: File) {
    const storageRef = ref(storage, `avatarImages/${id}`);
    await uploadBytesResumable(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}

export default UserModel;
