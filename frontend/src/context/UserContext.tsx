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
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        console.log(docRef);
        

                 // 👇 subscribe to user profile
         const unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
           if (docSnap.exists()) {
             const userData = { uid: firebaseUser.uid, ...docSnap.data() } as UserData;
             console.log("User data from Firestore:", userData);
             setUser(userData);
           } else {
             // fallback to auth data if no profile
             const fallbackUserData = { uid: firebaseUser.uid, email: firebaseUser.email || "" };
             console.log("Fallback user data:", fallbackUserData);
             setUser(fallbackUserData);
           }
           setLoading(false);
         }, (error) => {
           console.error("Firestore permission error:", error);
           // Fallback to auth data if Firestore access is denied
           setUser({ uid: firebaseUser.uid, email: firebaseUser.email || "" });
           setLoading(false);
         });

        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
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
