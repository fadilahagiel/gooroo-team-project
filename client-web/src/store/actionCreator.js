import axios from "axios";

const serverApp = `http://localhost:3000/`;

export const classesFetchSuccess = (data) => {
  return {
    type: "classes/fetchSuccess",
    payload: data,
  };
};
export const productFetchSuccess = (data) => {
  return {
    type: "classes/fetchSuccess",
    payload: data,
  };
};

export const categoryFetchSuccess = (data) => {
  return {
    type: "categories/fetchSuccess",
    payload: data,
  };
};
export const teacherFetchSuccess = (data) => {
  return {
    type: "teachers/fetchSuccess",
    payload: data,
  };
};

export const oneClassFetchSuccess = (data) => {
  return {
    type: "oneClass/fetchSuccess",
    payload: data,
  };
  console.log(data, "<<< DATA DI ACTION");
};

export const oneClassStudentsFetchSuccess = (data) => {
  return {
    type: "oneClassStudents/fetchSuccess",
    payload: data,
  };
  console.log(data, "<<< DATA DI ACTION");
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
        if (!res.ok) {
          throw new Error("hardcoded error");
        }
        return res.json();
      })
      .then((data) => {
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
        dispatch(productFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const createProduct = (productForm) => {
//   return (dispatch) => {
//     console.log("<< MASUK ACTION");
//     const access_token = localStorage.getItem("access_token");
//     return fetch(`${serverApp}/products`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         access_token,
//       },
//       body: JSON.stringify(productForm),
//     })
//       .then((res) => {
//         console.log("<< MASUK ACTION 2");
//         if (!res.ok) {
//           throw new Error("hadrcoded Error");
//         }
//         return res.json();
//       })
//       .then((body) => console.log(body))
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

/////////////////////

export const fetchTeacherProfile = () => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}teachers/detail`, {
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
        dispatch(teacherFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchClasses = () => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}classes/myClasses`, {
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
        dispatch(classesFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// http://localhost:3000/classes/myStudent/1

export const fetchOneClassStudents = (id) => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}classes/myStudent/${id}`, {
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
        console.log(data, "<<<DATA");
        dispatch(oneClassStudentsFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchOneClass = (id) => {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${serverApp}classes/${id}`, {
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
        dispatch(oneClassFetchSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const createProduct = (productForm) => {
//     return (dispatch) => {
//         console.log("<< MASUK ACTION");
//         const access_token = localStorage.getItem("access_token")
//         return fetch('http://localhost:3001/products', {
//             method: "POST",
//             headers: {
//                 'Content-Type': "application/json",
//                 access_token
//             },
//             body: JSON.stringify(productForm)
//         })
//         .then((res)=>{
//             console.log("<< MASUK ACTION 2");
//             if(!res.ok) {
//                 throw new Error('hadrcoded Error')
//             }
//             return res.json();
//         })
//         .then((body) => console.log(body))
//         .catch((err)=>{
//             console.log(err);
//           })

//     };
// }

export const postClass = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${serverApp}classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then((respon) => {
        if (!respon.ok) {
          throw new Error("There is an error");
        }
        respon.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createClass = (classForm) => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify(classForm),
    })
      .then((res) => {
        console.log("<< MASUK ACTION 2");
        if (!res.ok) {
          throw new Error(res);
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
    const access_token = localStorage.getItem("access_token");
    return fetch(`${serverApp}users/register`, {
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
    const access_token = localStorage.getItem("access_token");
    return (
      fetch(`${serverApp}categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(categoryForm),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("hadrcoded Error");
          }
          return res.json();
        })
        // .then((body) => )
        .catch((err) => {
          console.log(err);
        })
    );
  };
};

export const login = (loginForm) => {
  return (dispatch) => {
    return fetch(`${serverApp}users/login`, {
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
        localStorage.access_token = data.access_token;
        localStorage.id = data.id;
        dispatch({
          type: "status/login",
          payload: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteClass = (id) => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    return (
      fetch(`${serverApp}products/` + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        data: id,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("hadrcoded Error");
          }
          return res.json();
        })
        // .then((params) => )
        .catch((err) => {
          console.log(err);
        })
    );
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    return (
      fetch(`${serverApp}categories/` + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        data: id,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("hadrcoded Error");
          }
          return res.json();
        })
        // .then((params) => )
        .catch((err) => {
          console.log(err);
        })
    );
  };
};

export const updateClass = ({
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
    return fetch(`${serverApp}products/` + id, {
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
        if (!response.ok) {
          throw new Error("hardcoded error");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        throw error;
      });
  };
};

export const fetchContacts = () => {
  return async (dispatch, getState) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { data } = await axios({
        url: `${serverApp}contacts`,
        method: "get",
        headers: { access_token },
      });
      console.log("Data di action", access_token, data);
      dispatch({
        type: "contacts/fetch",
        payload: data.contacts,
      });
      const user = {
        id: data.userId,
        username: data.username,
        role: data.role,
        avatar: data.avatar,
      };
      // console.log("Di action creator - user", user);
      dispatch({
        type: "user/fetch",
        payload: user,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchChatLogs = (roomId) => {
  return async (dispatch, getState) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { data } = await axios({
        url: `${serverApp}contacts/chat`,
        method: "get",
        headers: { access_token, roomId },
      });
      console.log({ chat: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
