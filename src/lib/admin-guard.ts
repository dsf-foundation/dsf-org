import { auth } from "./firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMAIL || "dsf2939@gmail.com";

export function isAdminUser(user: User | null): boolean {
  if (!user) return false;
  return user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function getAdminEmail(): string {
  return ADMIN_EMAIL;
}

export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export async function requireAdmin(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user && isAdminUser(user)) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}

export function signOut(): Promise<void> {
  return auth.signOut();
}