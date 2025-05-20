export const initialStore = () => {
  return {
    message: null,
    messageError: "",
    protectedMessage: '',
    token: '',
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "set_error":
      const { error } = action.payload;
      return {
        ...store,
        messageError: error,
      };
    case "succes_login":
      const { token } = action.payload;
      return {
        ...store,
        token: token,
      };
    case "close_session":
      return {
        ...store,
        token: "",
      };
    case "protected_message":
      const { message } = action.payload;
      return {
        ...store,
        protectedMessage: message
      }
    default:
      throw Error("Unknown action.");
  }
}

export const signup = async (email, password, dispatch) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await resp.json();

    if (!resp.ok) {
      dispatch({ type: "set_error", payload: { error: data.msg } });
      return false;
    }

    return true;
  } catch (error) {
    console.error("ocurrio un error al registrar usuario", error);
    return false;
  }
};

export const login = async (email, password, dispatch) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await resp.json();

    if (!resp.ok) {
      dispatch({ type: "set_error", payload: { error: data.msg } });
      return false;
    }
    dispatch({ type: "succes_login", payload: { token: data.token } });
    return { token: data.token };
  } catch (error) {
    console.error("Ocurrio un error al iniciar sesion", error);
    return false;
  }
};

export const protectedRoute = async (token, dispatch) => {
  const resp = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}protected`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await resp.json();
  if (!resp.ok) {
    dispatch({type: 'set_error', payload: {error: 'No has iniciado sesion, seras redirigido para inicarla'}})
    return false;
  }
  dispatch({type: 'protected_message', payload: {message: data.msg}});
  return true;

};
