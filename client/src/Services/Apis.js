import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

// user registration
export const registerfunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/register`, data);
};

// user login
export const loginfunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/login`, data);
};

// get user data
export const userData = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/data`, data);
};

// get all users data
export const getAllUsersData = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/allusersdata`, data);
};

// block a user
export const toggleBlockUser = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/toggleblockuser`,
    data
  );
};

// update user's profile pic
export const userProfileUpdate = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/editprofile`, data, {
    "Content-Type": "multipart/form-data",
  });
};

// remove profile pic
export const removeProfilePic = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/removeprofilepic`,
    data
  );
};

// update user credential
export const updateUserCred = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/updatecred`, data);
};

// creating lost item post
export const createLostItemPost = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/lostitem`, data, {
    "Content-Type": "multipart/form-data",
  });
};

// creating found item post
export const createFoundItemPost = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/founditem`, data, {
    "Content-Type": "multipart/form-data",
  });
};

// get all lost item's data for a user
export const getAllLostItemDataUser = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/getalllostitems`,
    data
  );
};

// get all lost items post of users
export const getAllLostItemsPosted = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/getalllostitemsposted`,
    data
  );
};

// get all found item's data for a user
export const getAllFoundItemDataUser = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/getallfounditems`,
    data
  );
};

// get all found items post of users
export const getAllFoundItemsPosted = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/user/getallfounditemsposted`,
    data
  );
};

// delete one lost post
export const deleteLostPost = async (data) => {
  return await commonrequest(
    "DELETE",
    `${BACKEND_URL}/user/deletelostitem`,
    data
  );
};

// delete one found post
export const deleteFoundPost = async (data) => {
  return await commonrequest(
    "DELETE",
    `${BACKEND_URL}/user/deletefounditem`,
    data
  );
};
