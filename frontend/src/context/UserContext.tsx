import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { auth } from "../firebase"; // your firebase config
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const db = getFirestore();

type UserData = {
  uid: string;
  email: string;
  name?: string;
  dob?: string;
  createdAt?: string;
} | null;

interface UserContextType {
  user: UserData;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // Clean up previous Firestore listener whenever auth state changes
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);

        // Subscribe to user profile
        unsubscribeDoc = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const userData = { uid: firebaseUser.uid, ...docSnap.data() } as UserData;
              setUser(userData);
            } else {
              // Fallback to auth data if no profile exists
              setUser({ uid: firebaseUser.uid, email: firebaseUser.email || "" });
            }
            setLoading(false);
          },
          (error) => {
            console.error("Firestore permission error:", error);
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email || "" });
            setLoading(false);
          }
        );
      } else {
        // No authenticated user
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeDoc) unsubscribeDoc();
      unsubscribeAuth();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
