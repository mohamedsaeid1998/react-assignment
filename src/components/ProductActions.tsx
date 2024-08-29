import { useDeleteProductMutation } from "@/redux/services/Products/ProductsSlice";
import { LoaderCircle, Trash } from "lucide-react";
import ProductDialog from "./ProductDialog";
import { Button } from "./ui/button";

interface IProps {
  id: number;
  refetch: () => void;
}

const ProductActions = ({ id, refetch }: IProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handelDelete = async () => {
    await deleteProduct(String(id));
    refetch();
  };
  return (
    <>
      <ProductDialog operation="Edit" {...{id,refetch}} />
      <Button onClick={handelDelete} size={"icon"} variant={"destructive"}>
        {isLoading ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <Trash size={16} />
        )}
      </Button>
    </>
  );
};

export default ProductActions;
