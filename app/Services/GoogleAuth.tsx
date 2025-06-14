import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

// Configure GoogleSignin
GoogleSignin.configure({
  webClientId:
    "707983838690-ubrfgq9g071gmine5vg6hi8g2vqcetgh.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId:
    "707983838690-nr7qgh2if45mkf545d1sa870g2i6es1k.apps.googleusercontent.com",
  profileImageSize: 120,
});

const GoogleAuth = {
  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error("Sign in was cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error("Sign in is already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Play services not available");
      } else {
        throw error;
      }
    }
  },

  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      return true;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    } catch (error) {
      throw error;
    }
  },

  checkIsSignedIn: async (): Promise<boolean> => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser !== null;
    } catch (error) {
      throw error;
    }
  },

  getTokens: async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      return tokens;
    } catch (error) {
      throw error;
    }
  },
};

export default GoogleAuth;
