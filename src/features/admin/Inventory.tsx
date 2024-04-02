import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { IconDots } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";

const Inventory: React.FC = () => {
  return (
    <>
      <div className="yflex yflex-col ygap-4 ypy-4">
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
        <Card className="lg:yflex lg:yjustify-around p-6 lg:yitems-center">
          <div className="yflex yflex-col yitems-center lg:yflex-row">
            <Skeleton className="yh-24 yw-full ybg-neutral-200 lg:yh-20 lg:yw-24 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
              <CardDescription className="yflex ygap-3 yitems-center">
                <Badge>4 Variants</Badge>
                <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                <div className="yflex yitems-center ygap-1">
                  <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                  <Label className="ytext-xs yfont-medium">
                    Product Stocked: 50
                  </Label>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          <Separator
            className="hidden lg:block lg:yh-14 lg:yw-1"
            orientation="vertical"
          />
          <CardContent className="yflex ygap-5">
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Sells
              </h1>
              <Label className="ytext-sm yfont-semibold yflex yitems-center">
                <Icon fontSize={16} icon="tabler:currency-peso" />
                <span>124</span>
              </Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Discounted
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
            <div className="yflex yflex-col ygap-3">
              <h1 className="yuppercase ytext-xs yfont-semibold ytext-neutral-500">
                Total Return
              </h1>
              <Label className="ytext-sm yfont-semibold">2</Label>
            </div>
          </CardContent>
          <span className="yhidden lg:yblock">
            <IconDots size="24" />
          </span>
        </Card>
      </div>
    </>
  );
};

export default Inventory;
