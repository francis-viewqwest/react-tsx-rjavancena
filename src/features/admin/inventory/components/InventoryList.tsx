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

import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
          <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
            <div className="md:yflex md:yitems-center">
              <Skeleton className="hidden ybg-neutral-200 lg:yh-20 lg:yw-28 lg:yrounded-xl" />
              <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col">
                <div className="yflex yitems-center yjustify-between">
                  <CardTitle className="ytext-md">{item.productName}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="lg:yhidden">
                      <Button variant="ghost">
                        <DotsHorizontalIcon className="md:yhidden md:yh-5 md:yw-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="yw-4 yh-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>
                          <TrashIcon className="yw-4 yh-4" color="red" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="yflex ygap-3 yitems-center">
                  <Badge>{item.variants} Variants</Badge>
                  <Label className="yfont-medium ytext-xs">
                    {item.category}
                  </Label>
                  <div className="yflex yitems-center ygap-1">
                    <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                    <Label className="ytext-xs yfont-medium">
                      Product Stocked: {item.stock}
                    </Label>
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <Separator
              className="hidden md:block lg:yh-14 lg:yw-1"
              orientation="vertical"
            />
            <CardContent className="yflex yjustify-between ygap-5 lg:ygap-9">
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Sells
                </h1>
                <Label className="ytext-sm yfont-semibold yflex yitems-center">
                  <Icon fontSize={16} icon="tabler:currency-peso" />
                  <span>{item.totalSells}</span>
                </Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Discounted
                </h1>
                <Label className="ytext-sm yfont-semibold">
                  {item.totalDisc}
                </Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Return
                </h1>
                <Label className="ytext-sm yfont-semibold">
                  {item.totalReturn}
                </Label>
              </div>
            </CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="yhidden md:yblock yh-5 yw-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil1Icon className="yw-4 yh-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove
                  <DropdownMenuShortcut>
                    <TrashIcon className="yw-4 yh-4" color="red" />
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
