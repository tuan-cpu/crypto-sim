import UserModel from "../models/users.models";
const dataInstance = new UserModel();

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

const updateUserProfile = async (userProfile: UserProfile) => {
    await dataInstance.updateUserProfile(userProfile);
}
const getUserProfile = async (id: string) => {
    return await dataInstance.getUserProfile(id);
}
const getUserImage = async (id: string) => {
    const response = await dataInstance.getUserProfile(id);
    if(response) return response.image;
    else return null;
}
const uploadAvatar = async (id: string, file: File) => {
    await dataInstance.deleteOldAvatar(id);
    return await dataInstance.uploadAvatar(id, file);
}

const updateAvatar = async (id: string, url: string) => {
    await dataInstance.updateAvatar(id, url);
    window.location.reload();
}

export { updateUserProfile, uploadAvatar, updateAvatar, getUserProfile, getUserImage };