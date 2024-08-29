import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IProduct } from "@/interFaces";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useProductsDetailsQuery,
} from "@/redux/services/Products/ProductsSlice";

import TextField from "@/components/input";
import {
  FieldValidation,
  priceValidation,
  stockValidation,
  titleValidation,
} from "@/utils/validation";
import { Pen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface IProps {
  refetch?: () => void;
  operation?: string;
  id?: number;
}

const ProductDialog = ({ refetch, operation, id }: IProps) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>();

  const [open, setOpen] = useState(false);
  // const [operation, setOperation] = useState("Add");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updatedProduct] = useEditProductMutation();

  const { data: productDetails } = useProductsDetailsQuery(id, {
    skip: !(operation === "Edit" && open),
  });
  console.log(productDetails);
  useEffect(() => {
    if (productDetails) {
      setValue("title", productDetails?.data?.attributes?.title);
      setValue("description", productDetails?.data?.attributes?.description);
      setValue("price", productDetails?.data?.attributes?.price);
      setValue("stock", productDetails?.data?.attributes?.stock);
      setValue("thumbnail", productDetails?.data?.attributes?.thumbnail);
    }
  }, [productDetails]);

  const createNewProduct = async (data: IProduct) => {
    console.log(data);
    const { title, description, price, stock, thumbnail } = data;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title,
        description,
        price: Number(price),
        stock: Number(stock),
      })
    );
    formData.append("files.thumbnail", thumbnail);

    if (operation === "Add") {
      const response = await createProduct(formData);
      if (response.data !== undefined) {
        reset();
        setOpen(false);
        if (refetch) refetch();
      }
    } else if (operation === "Edit") {
      // const allData = { ...formData, id };
      // console.log({ ...formData, id });
      const response = await updatedProduct({ id: id, data: formData });
      if (response.data !== undefined) {
        reset();
        setOpen(false);
        if (refetch) refetch();
      }
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className={`${operation === "Add" ? "w-full  text-end" : ""}`}>
          <DialogTrigger asChild>
            <Button size={operation === "Add" ? "default" : "icon"}>
              {operation === "Add" ? (
                <>
                  {" "}
                  <Plus size={14} className="mr-2" /> Add Product{" "}
                </>
              ) : (
                <Pen size={16} />
              )}
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {operation === "Add" ? "Add New Product" : "Edit This Product"}
            </DialogTitle>
          </DialogHeader>
          <div className=" py-4">
            <form onSubmit={handleSubmit(createNewProduct)}>
              <div className="flex flex-col  w-full items-center gap-4 mb-6 ">
                <TextField
                  label="Title"
                  {...register("title", titleValidation)}
                  error={errors?.title?.message}
                  value={productDetails?.title}
                  placeholder="Type Product Title"
                  className="w-full"
                />
                <TextField
                  label="Description"
                  {...register("description", FieldValidation)}
                  error={errors?.description?.message}
                  placeholder="Type Product Description"
                  className="w-full"
                />
                <TextField
                  label="Price"
                  type="number"
                  {...register("price", priceValidation)}
                  error={errors?.price?.message}
                  placeholder="Type Product price"
                  className="w-full"
                />
                <TextField
                  label="Stock"
                  type="number"
                  {...register("stock", stockValidation)}
                  error={errors?.stock?.message}
                  placeholder="Type Product Stock"
                  className="w-full"
                />
                <TextField
                  label="thumbnail"
                  type="file"
                  {...register("thumbnail", FieldValidation)}
                  error={errors?.thumbnail?.message}
                  placeholder="Type Product thumbnail"
                  className="w-full"
                />
                <Button
                  variant={"secondary"}
                  className="mt-1"
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingText={"Saving"}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>{" "}
    </>
  );
};

export default ProductDialog;
