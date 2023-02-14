import { ref } from "vue";
import useAccount from "./useAccount";

const data = ref([]);
const account = useAccount();

const useTasks = () => {
  const refresh = async () => {
    // If user is not logged in
    if (!account.user.value) {
      return;
    }

    // Fetch task data from server
    const response = await fetch("http://127.0.0.1:3000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: account.accessToken.value,
      },
    }).then((res) => res.json());

    // Assign global task data to response
    data.value = response;
    return response;
  };

  const create = async (title, due) => {
    // If user is not logged in
    if (!account.user.value) {
      return;
    }

    // Request to create new task
    const response = await fetch("http://127.0.0.1:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: account.accessToken.value,
      },
      body: JSON.stringify({
        title: title,
        due: due,
      }),
    }).then((res) => res.json());

    if (response.error) {
      return response;
    }

    // Add response object to data stack
    data.value.push(response);

    // Return response to user
    return response;
  };

  const remove = async (id) => {
    // If user is not logged in
    if (!account.user.value) {
      return;
    }

    // Delete task from backend
    const response = await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: account.accessToken.value,
      },
    }).then((res) => res.json());

    // If an error occurred, return nothing
    if (response.error) {
      return;
    }

    // Return response to user
    return response;
  };

  const update = async (id, title, due, done) => {
    // If user is not logged in
    if (!account.user.value) {
      return;
    }

    const response = await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: account.accessToken.value,
      },
      body: JSON.stringify({ title: title, due: due, done: done }),
    }).then((res) => res.json());

    // If an error occurred, return nothing
    if (response.error) {
      return;
    }

    return response;
  };

  return { data, refresh, create, update, remove };
};

export default useTasks;
