import { IProduct, IFormError } from "@/interFaces";
import CookieServices from "@/services/cookieServices/CookieServices";
import { BASE_URL, PRODUCTS_URLS } from "@/services/endPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";


export const ProductsApiSlice = createApi({
  reducerPath: "products",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    productsList: builder.query({
      query: () => ({
        url: PRODUCTS_URLS.getProductList,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URLS.createProduct,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`,
        },
        body: data,
      }),

      invalidatesTags: ["Products"],

      transformResponse: (response: IProduct) => {
        toast.success("Product created successfully");
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.error?.message);
        return error;
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: PRODUCTS_URLS.UpdateOrDeleteProduct(id),
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`,
          },
        }
      },
      invalidatesTags: ["Products"],

      transformResponse: (response: IProduct) => {
        console.log(response);
        toast.success("Product deleted successfully");
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        console.log(error);
        toast.error(error?.data?.error?.message);
        return error;
      }
    }),

    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: PRODUCTS_URLS.UpdateOrDeleteProduct(id),
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`,
        },

      }),
      invalidatesTags: ["Products"],

      transformResponse: (response: IProduct) => {
        toast.success("Product updated successfully");
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.error?.message);
        return error;
      }
    }),
    productsDetails: builder.query({
      query: (id) => ({
        url: PRODUCTS_URLS.UpdateOrDeleteProduct(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
    }),

  }),
})
export const { useCreateProductMutation, useProductsListQuery, useDeleteProductMutation, useEditProductMutation, useProductsDetailsQuery } = ProductsApiSlice
