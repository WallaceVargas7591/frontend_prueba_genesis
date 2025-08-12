import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  name: string; // Product name
  variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  category: string; // Category of the product
  price: string; // Price of the product (as a string with currency symbol)
  // status: string; // Status of the product
  image: string; // URL or path to the product image
  status: "Entregado" | "Pendiente" | "Cancelado"; // Status of the product
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "Orden 12 tamales",
    variants: "Cantidad 1",
    category: "Laptop",
    price: "Q.112.00",
    status: "Entregado",
    image: "/images/product/product-01.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Orden 12 tamales",
    variants: "Cantidad 2",
    category: "Watch",
    price: "Q.224.00",
    status: "Pendiente",
    image: "/images/product/product-02.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Combo 1 tamal + bebida natural",
    variants: "Cantidad 1",
    category: "SmartPhone",
    price: "Q.12.00",
    status: "Entregado",
    image: "/images/product/product-03.jpg", // Replace with actual image URL
  },
  {
    id: 4,
   name: "Combo 1 tamal + bebida natural",
    variants: "Cantidad 1",
    category: "SmartPhone",
    price: "Q.12.00",
    status: "Cancelado",
    image: "/images/product/product-03.jpg", // Replace with actual image URL
  },
  {
    id: 5,
    name: "Orden 1 tamal",
    variants: "Cantidad 4",
    category: "Laptop",
    price: "Q.40.00",
    status: "Entregado",
    image: "/images/product/product-01.jpg", // Replace with actual image URL
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ordenes recientes
          </h3>
        </div>

      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Producto
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Precio
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Entregado"
                        ? "success"
                        : product.status === "Pendiente"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
