
import { ModeToggle, ProductActions, ProductDialog, SignOut } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProductsListRes } from "@/interFaces";
import { useProductsListQuery } from "@/redux/services/Products/ProductsSlice";
import { formatPrice } from "@/utils/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";

const Home = () => {
  const { data: products, refetch } = useProductsListQuery(0);
  console.log(products);
  const MotionRow = motion(TableRow);
  return (
    <>
      <main className="container flex-col h-screen justify-center items-center">
        <div className="flex items-center justify-between mb-5">
          <ModeToggle />
          <SignOut />
        </div>
        <ProductDialog operation="Add" {...{ refetch }} />

        <div className="pt-6">
          <Table>
            <TableCaption>A list of your recent Products.</TableCaption>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[100px] hidden md:table-cell">
                  ID
                </TableHead> */}
                <TableHead>TITLE</TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>STOCK</TableHead>
                <TableHead className="hidden sm:table-cell ">
                  CREATED AT
                </TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {products?.data?.map(({ id, attributes }: IProductsListRes) => (
                  <MotionRow
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ layout: { type: "spring" } }}
                    layout
                  >
                    <TableCell className="font-medium hidden md:table-cell">
                      {attributes.title}
                    </TableCell>
                    <TableCell>{attributes.description}</TableCell>
                    <TableCell>{formatPrice(attributes.price)}</TableCell>
                    <TableCell> {attributes.stock}</TableCell>
                    <TableCell className=" hidden sm:table-cell">
                      <span>
                        {moment(attributes?.createdAt).format("Do MMM YY ")}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end items-center space-x-2">
                      <ProductActions {...{ id, refetch }} />
                    </TableCell>
                  </MotionRow>
                ))}
              </AnimatePresence>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">
                  {!products?.data?.length
                    ? "You Don't have Any products Yet"
                    : products?.data?.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </>
  );
};

export default Home;
