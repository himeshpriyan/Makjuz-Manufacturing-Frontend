import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { MockDB, mockDelay, MockUser } from "../data/mockData";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "planning" | "production" | "quality" | "purchase" | "npd" | "sales" | "stores";
  lastLogin: Date | string;
  phone?: string;
  companyName?: string;
  department?: string;
  location?: string;
  bio?: string;
  joinedDate?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
}

interface AuthActions {
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    devtools((set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: false,
      message: null,

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          await mockDelay(400);

          const existing = MockDB.findUserByEmail(email);
          if (existing) {
            throw new Error("A user with this email already exists");
          }

          const newUser = MockDB.addUser({
            name,
            email,
            password,
            role: "user",
            lastLogin: new Date().toISOString(),
            companyName: "Makjuz Manufacturing",
            department: "Operations"
          });

          const { password: _, ...userWithoutPassword } = newUser;

          set({
            user: userWithoutPassword as User,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error: any) {
          console.error("Signup error:", error);
          set({
            error: error.message || "Error signing up",
            isLoading: false,
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          await mockDelay(300);

          const trimmedEmail = email.trim().toLowerCase();
          const mockUsers = MockDB.getUsers();
          const matchedUser = mockUsers.find(u => u.email.toLowerCase() === trimmedEmail);

          if (matchedUser) {
            // Check password if set
            if (matchedUser.password && matchedUser.password !== password) {
              throw new Error("Invalid password");
            }

            const updatedUser = MockDB.updateUser(matchedUser._id, {
              lastLogin: new Date().toISOString()
            }) || matchedUser;

            const { password: _, ...userWithoutPassword } = updatedUser;

            set({
              isAuthenticated: true,
              user: userWithoutPassword as User,
              error: null,
              isLoading: false
            });
            return;
          }

          // If not in standard list, create an active session user
          const newUser = MockDB.addUser({
            name: email.split("@")[0] || "Demo User",
            email: trimmedEmail,
            password,
            role: "admin", // Default to admin for full exploration if unknown email
            lastLogin: new Date().toISOString()
          });

          const { password: _, ...userWithoutPassword } = newUser;

          set({
            isAuthenticated: true,
            user: userWithoutPassword as User,
            error: null,
            isLoading: false
          });
        } catch (error: any) {
          console.error("Login error:", error);
          set({
            error: error.message || "Invalid email or password",
            isLoading: false,
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await mockDelay(100);
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: false
          });
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            error: "Error logging out",
            isLoading: false,
            isCheckingAuth: false
          });
        }
      },

      checkAuth: async () => {
        if (get().isCheckingAuth) {
          return;
        }

        set({ isCheckingAuth: true, error: null });

        try {
          const persistedUser = get().user;
          if (persistedUser && persistedUser.email) {
            set({
              user: persistedUser,
              isAuthenticated: true,
              isCheckingAuth: false,
              error: null
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isCheckingAuth: false,
              error: null
            });
          }
        } catch (error: any) {
          set({
            error: null,
            isCheckingAuth: false,
            isAuthenticated: false,
            user: null
          });
        }
      }
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.isAuthenticated && !state.user) {
            state.isAuthenticated = false;
            state.user = null;
          }
        }
      }
    }
  )
);