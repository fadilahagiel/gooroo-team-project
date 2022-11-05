const axios = require("axios");
const redis = require("../config/redis");
const urlBase = "http://localhost:3000";

const typeDefs = `#graphql
 type Wishlists{
    id: ID
    StudentId: Int
    ClassId: Int
    Class: Class
 }
 type message{
    message: String
 }
 type Class{
    id: ID
    TeacherId: Int
    name: String
    price: Int
    quota: Int
    averageRating: String
    status: String
    SubjectId: Int
    description: String
    url: String
    Subject: Subject
 }

 type Subject {
    id: ID
    name: String
    image: String
 }

type Query {
    getWishlist (access_token: String): [Wishlists]
}

type Mutation{
    addWishlist(ClassId: Int, access_token:String): message
    deleteWishlist(WishlistId:ID, access_token:String):message
}
`;

const resolver = {
  Query: {
    getWishlist: async (_, args) => {
      try {
        const { access_token } = args;
        const { data } = await axios({
          method: "get",
          url: `${urlBase}/wishlist`,
          headers: {
            access_token,
          },
        });
        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
  Mutation: {
    addWishlist: async (_, args) => {
      try {
        const { ClassId } = args;
        const { access_token } = args;
        const { data } = await axios({
          method: "post",
          url: `${urlBase}/wishlist/${ClassId}`,
          headers: {
            access_token,
          },
        });
        return data;
      } catch (error) {
        return error.response.data;
      }
    },
    deleteWishlist: async (_, args) => {
      try {
        const { WishlistId } = args;
        const { access_token } = args;
        const { data } = await axios({
          method: "delete",
          url: `${urlBase}/wishlist/${WishlistId}`,
          headers: {
            access_token,
          },
        });
        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = { typeDefs, resolver };
