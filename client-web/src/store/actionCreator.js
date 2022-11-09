//khusus Heroku function delete dan add product belum bisa, tetapi di localhost sudah bisa semua
import axios from "axios";

const serverApp = "http://localhost:3000";
const serverChat = "http://localhost:3030";

export const productFetchSuccess = (data) => {
  return {
    type: "products/fetchSuccess",
    payload: data,
  };
};
export const categoryFetchSuccess = (data) => {
  return {
    type: "categories/fetchSuccess",
    payload: data,
  };
};

export const fetchCategory = () => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}/categories`, {
      method: "GET",
      headers: {
        access_token,
      },
    })
      .then((res) => {
        console.log(res, "INI CATEGORY DI ACTION");
        if (!res.ok) {
          throw new Error("hardcoded error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(categoryFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchProducts = () => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}/products`, {
      method: "GET",
      headers: {
        access_token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("hardcoded error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(productFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createProduct = (productForm) => {
  return (dispatch) => {
    console.log("<< MASUK ACTION");
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify(productForm),
    })
      .then((res) => {
        console.log("<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }
        return res.json();
      })
      .then((body) => console.log(body))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const registerAdmin = (registerForm) => {
  return (dispatch) => {
    console.log("<< MASUK ACTION REGISTER");
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify(registerForm),
    })
      .then((res) => {
        console.log(res, "<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }
        return res.json();
      })
      .then((body) => console.log(body))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
};

export const createCategory = (categoryForm) => {
  return (dispatch) => {
    console.log("<< MASUK ACTION");
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify(categoryForm),
    })
      .then((res) => {
        console.log("<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }
        return res.json();
      })
      .then((body) => console.log(body))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const login = (loginForm) => {
  return (dispatch) => {
    console.log(loginForm, "<<<LOGIN FORM");
    return fetch(`${serverApp}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log({ token: data.access_token });
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}/products/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      data: id,
    })
      .then((res) => {
        console.log(id, "<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }
        return res.json();
      })
      .then((params) => console.log(params))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}/categories/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      data: id,
    })
      .then((res) => {
        console.log(id, "<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error("hadrcoded Error");
        }
        return res.json();
      })
      .then((params) => console.log(params))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateProduct = ({
  id,
  name,
  description,
  stock,
  price,
  mainImg,
  categoryId,
  imgUrl1,
  imgUrl2,
  imgUrl3,
}) => {
  return (dispatch) => {
    console.log(id, "<<<MASUK ACTION");
    return fetch(`${serverApp}/products/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        name: name,
        stock: stock,
        description: description,
        price: price,
        mainImg: mainImg,
        categoryId: categoryId,
        imgUrl1,
        imgUrl2,
        imgUrl3,
      }),
    })
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          throw new Error("hardcoded error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "<<INI DATA");
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
};

export const fetchContacts = () => {
  return async (dispatch, getState) => {
    try {
      const access_token = localStorage.getItem("access_token");
      console.log({ access_token });
      const { data } = await axios({
        url: `${serverApp}/contacts`,
        method: "get",
        headers: { access_token },
      });
      dispatch({
        type: "contacts/fetch",
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
