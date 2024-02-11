import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

const ShopProduct: React.FC = () => {
  const products = [
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Hardware",
      title: "Power Drill Set",
      price: "$89.99",
    },
  ];

  return (
    <>
      <div className="w-full h-full p-4 max-w-[1200px] m-auto my-20">
        <div className="divider divider-start text-xl font-black">
          Shop Products
        </div>
        <div className="my-20 flex flex-col gap-8 w-full md:flex-row sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-9">
          {products.map((item, index) => (
            <div
              key={index}
              className="card card-compact w-full relative bg-base-100 shadow-xl"
            >
              <button className="btn btn-circle btn-ghost absolute right-0 m-4">
                <HeartIcon className="w-6 h-6" />
              </button>
              <figure>
                <img src={item.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <p>{item.category}</p>
                <h2 className="card-title">{item.title}!</h2>
                <p>{item.price}</p>
                <div className="flex flex-row w-full justify-between gap-1 items-center">
                  <button className="btn btn-md flex-grow bg-btnprimary text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopProduct;
