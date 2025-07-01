import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  // If there's no user, redirect to the auth flow
  if (!user) {
    return <Redirect href="/(auth)/home" />;
  }

  // If there is a user, redirect to the main app
  return <Redirect href="/(app)/dashboard" />;
} 