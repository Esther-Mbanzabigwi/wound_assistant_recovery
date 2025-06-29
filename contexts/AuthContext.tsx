import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithSocial: (provider: "google" | "apple") => Promise<void>;
  signInWithOTP: (phone: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // For now, simulate authentication
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
      };

      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      const mockUser: User = {
        id: "1",
        email,
        name,
      };

      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithSocial = async (provider: "google" | "apple") => {
    setIsLoading(true);
    try {
      // TODO: Implement social authentication
      console.log(`Signing in with ${provider}`);
      throw new Error("Social authentication not implemented yet");
    } catch (error) {
      console.error("Social sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithOTP = async (phone: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement OTP authentication
      console.log(`Sending OTP to ${phone}`);
      throw new Error("OTP authentication not implemented yet");
    } catch (error) {
      console.error("OTP sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithSocial,
    signInWithOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
