import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { IconCircleFilled } from "@tabler/icons-react";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface ProductContent {
  id: number;
  img: any;
  productName: string;
  category: string;
  variants: number;
  stock: number;
  totalSells: number;
  totalDisc: number;
  totalReturn: number;
}

const InventoryList: React.FC = () => {
  const product: ProductContent[] = [
    {
      id: 1,
      img: null,
      productName: "2B ACRYLON 4",
      category: "Paint",
      variants: 4,
      stock: 50,
      totalSells: 124,
      totalDisc: 2,
      totalReturn: 2,
    },
    {
      id: 2,
      img: null,
      productName: "2B ACRYLON 4",
      category: "Paint",
      variants: 4,
      stock: 50,
      totalSells: 124,
      totalDisc: 2,
      totalReturn: 2,
    },
    {
      id: 3,
      img: null,
      productName: "2B ACRYLON 4",
      category: "Paint",
      variants: 4,
      stock: 50,
      totalSells: 124,
      totalDisc: 2,
      totalReturn: 2,
    },
  ];

  return (
    <>
      {product.map((item, index) => (
        <Link key={index} to="/app/product-list">
          <Card className="md:flex md:items-center md:justify-between px-4">
            <div className="md:flex md:items-center">
              {/* <Skeleton className="hidden bg-neutral-200 lg:block lg:h-20 lg:w-28 lg:rounded-xl" /> */}
              <CardHeader className="w-full justify-start left-0 lg:flex lg:flex-col">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md">{item.productName}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="lg:hidden">
                      <Button variant="ghost">
                        <DotsHorizontalIcon className="md:hidden md:h-5 md:w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="w-4 h-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>
                          <TrashIcon className="w-4 h-4" color="red" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="flex gap-3 items-center">
                  <Badge>{item.variants} Variants</Badge>
                  <Label className="font-medium text-xs">{item.category}</Label>
                  <div className="flex items-center gap-1">
                    <IconCircleFilled size="9" color="green" />
                    <Label className="text-xs font-medium">
                      Product Stocked: {item.stock}
                    </Label>
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <Separator
              className="hidden md:block lg:h-14 lg:w-1"
              orientation="vertical"
            />
            <CardContent className="flex justify-between gap-5 lg:gap-9">
              <div className="flex flex-col gap-3">
                <h1 className="uppercase text-xs font-medium text-neutral-500">
                  Total Sells
                </h1>
                <Label className="text-sm font-semibold flex items-center">
                  <Icon fontSize={16} icon="tabler:currency-peso" />
                  <span>{item.totalSells}</span>
                </Label>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="uppercase text-xs font-medium text-neutral-500">
                  Total Discounted
                </h1>
                <Label className="text-sm font-semibold">
                  {item.totalDisc}
                </Label>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="uppercase text-xs font-medium text-neutral-500">
                  Total Return
                </h1>
                <Label className="text-sm font-semibold">
                  {item.totalReturn}
                </Label>
              </div>
            </CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="hidden md:block h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil1Icon className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove
                  <DropdownMenuShortcut>
                    <TrashIcon className="w-4 h-4" color="red" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default InventoryList;
