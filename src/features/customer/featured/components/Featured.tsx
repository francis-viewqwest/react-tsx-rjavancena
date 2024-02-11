import React from "react";

const Featured: React.FC = () => {
  const featuredProducts = [
    {
      img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Power Drill Set",
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      img: "https://images.unsplash.com/photo-1595514535316-b8c85bf9bbf9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Chrome Finish Faucet",
      desc: "Featuring a modern design and durable construction, it adds a touch of elegance to any space.",
    },
    {
      img: "https://images.unsplash.com/photo-1516885726422-4d4bbfce5b9e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "LED Light Bulb Pack",
      desc: "This pack of six bulbs offers a long-lasting and eco-friendly lighting solution for your home or office.",
    },
    {
      img: "https://images.unsplash.com/photo-1581619897692-ebbf1c3883ae?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Power Drill Set",
      desc: "Packed with high-quality tools, it's perfect for both beginners and seasoned craftsmen tackling various projects.",
    },
  ];

  return (
    <>
      <div className="w-full h-full p-4 max-w-[1200px] m-auto my-20">
        <div className="divider divider-start text-xl font-black">
          Featured Products
        </div>
        <div className="w-full grid grid-cols-2 gap-7 my-20">
          {featuredProducts.map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
            >
              <div className="h-full w-full">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center my-10 mx-5 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="text-xs md:text-3xl font-bold text-white uppercase">
                  {item.title}
                </h1>
                <p className="hidden my-5 sm:block md:text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Featured;
