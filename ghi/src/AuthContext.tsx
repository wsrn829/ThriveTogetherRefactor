import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the interface for login credentials
interface LoginInterface {
  username: string;
  password: string;
}

// Define a type for registration data
type RegistrationData = LoginInterface | any;

// Function to fetch access token from the API
export const getAccessToken = async (
  baseUrl: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${baseUrl}/token`, {
      credentials: "include",
    });
    const data = await response.json();
    return data?.access_token ?? null;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Define the context type for authentication
export declare type AuthContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  baseUrl: string;
};

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => null,
  baseUrl: "",
});

// Define props interface for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
  baseUrl: string;
}

// AuthProvider component to provide authentication context
export const AuthProvider = ({ children, baseUrl }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  // Fetch token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken(baseUrl);
      setToken(token);
    };
    if (!token) {
      fetchToken();
    }
  }, [baseUrl, token]);

  return (
    <AuthContext.Provider value={{ token, setToken, baseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);

// Custom hook to provide authentication actions
const useAuthActions = () => {
  const { token, setToken, baseUrl } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken(baseUrl);
      setToken(token);
    };
    if (!token) {
      fetchToken();
    }
  }, [baseUrl, token, setToken]);

  // Function to log out and delete token
  const logout = async () => {
    try {
      if (token) {
        const url = `${baseUrl}/token`;
        await fetch(url, { method: "delete", credentials: "include" });
        setToken(null);
        document.cookie =
          "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // // Function to log in and set token
  // const login = async (
  //   username: string,
  //   password: string
  // ): Promise<Boolean> => {
  //   try {
  //     const url = `${baseUrl}/token`;
  //     const form = new FormData();
  //     form.append("username", username);
  //     form.append("password", password);
  //     const response = await fetch(url, {
  //       method: "post",
  //       credentials: "include",
  //       body: form,
  //     });
  //     const token = await response.json();
  //     if (token) {
  //       setToken(token);
  //       return true; // Login was successful
  //     } else {
  //       throw new Error("Failed to get token after login");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     throw new Error(
  //       "Login failed. Please check your credentials and try again."
  //     );
  //   }
  // };

  // Function to log in and set token
  const login = async (
    username: string,
    password: string
  ): Promise<Boolean> => {
    try {
      const url = `${baseUrl}/token`;
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      const response = await fetch(url, {
        method: "post",
        credentials: "include",
        body: form,
      });
      const tokenResponse = await response.json(); // Assuming the response contains the token object
      if (tokenResponse.access_token) {
        const accessToken = tokenResponse.access_token; // Extracting access token from the response
        setToken(accessToken); // Storing the access token string in state
        return true; // Login was successful
      } else {
        throw new Error("Failed to get token after login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  // Function to register user account
  const register = async (
    userData: RegistrationData,
    url: string,
    method = "POST"
  ): Promise<Boolean> => {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await login(userData.email, userData.password);
        return true; // Registration was successful
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering:", error);
      throw new Error("Registration failed. Please try again later.");
    }
  };

  // Function to fetch data with cookie
  const fetchWithCookie = async (
    url: string,
    method = "GET",
    options: object = {}
  ): Promise<{ data: any; ok: boolean }> => {
    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        ...options,
      });
      return { data: await response.json(), ok: response.ok };
    } catch (error) {
      console.error("Error fetching data with cookie:", error);
      throw error;
    }
  };

  // Function to fetch data with token
  const fetchWithToken = async (
    url: string,
    method = "GET",
    otherHeaders: object = {},
    options: object = {}
  ): Promise<any> => {
    if (!token) {
      console.error("Token is not available");
      return { data: null, ok: false };
    }
    console.log("Token:", token);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...otherHeaders,
        },
        ...options,
      });
      return { data: await response.json(), ok: response.ok };
    } catch (error) {
      console.error("Error fetching data with token:", error);
      return { data: null, ok: false };
    }
  };

  return { token, register, login, logout, fetchWithCookie, fetchWithToken };
};

export default useAuthActions;
