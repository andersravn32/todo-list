import { ref } from "vue";

const user = ref(null);
const refreshToken = ref(null);
const accessToken = ref(null);

const useAccount = () => {

  const signin = async (email, password) => {
    const response = await fetch("http://127.0.0.1:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());

    // Guard statement
    if (response.error) {
      return response;
    }

    // Update local data store
    user.value = response.user;
    refreshToken.value = response.refreshToken;
    accessToken.value = response.accessToken;

    // Set localStorage
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    // Return initial response object
    return response;
  };

  const signup = async (firstName, lastName, email, password) => {
    const response = await fetch("http://127.0.0.1:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    }).then((res) => res.json());

    // Guard statement
    if (response.error) {
      return response;
    }

    // Update local data store
    user.value = response.user;
    refreshToken.value = response.refreshToken;
    accessToken.value = response.accessToken;

    // Set localStorage
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    // Return initial response object
    return response;
  };

  const signout = async () => {
    if (!refreshToken.value) {
      return;
    }

    const response = await fetch("http://127.0.0.1:3000/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken.value,
      }),
    });

    // Guard statement
    if (response.error) {
      return response;
    }

    // Reset values
    user.value = null;
    refreshToken.value = null;
    accessToken.value = null;

    // Clear localStorage
    localStorage.clear();

    // Return response
    return response;
  };

  const refresh = async () => {
    if (!refreshToken.value) {
      return;
    }

    const response = await fetch("http://127.0.0.1:3000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken.value,
      }),
    });

    // Guard statement
    if (response.error) {
      return response;
    }

    // Update local data store
    user.value = response.user;
    refreshToken.value = response.refreshToken;
    accessToken.value = response.accessToken;

    // Set localStorage
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);

    // Return initial response object
    return response;
  };

  return { user, refreshToken, accessToken, signin, signout, signup, refresh };
};

export default useAccount;
