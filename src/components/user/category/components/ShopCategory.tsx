import React from "react";

const Shopcategory: React.FC = () => {
  const categoryList = [
    {
      category: "Tools",
      sub: [
        {
          label: "Power Tools",
          child: [
            { label: "Power Drill Sets" },
            { label: "Impact Wrenches" },
            { label: "Rotary Kits" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Building Materials",
      sub: [
        {
          label: "Lumber",
          child: [
            { label: "Premium Wood Planks" },
            { label: "Plywood Sheets" },
            { label: "Pressure-Treated Timber" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Plumbing",
      sub: [
        {
          label: "Faucets and Fixtures",
          child: [
            { label: "Chrome Finish Faucets" },
            { label: "Stainless Steel Sinks" },
            { label: "Shower Head Sets" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Electrical",
      sub: [
        {
          label: "Lighting",
          child: [
            { label: "LED Light Bulb Packs" },
            { label: "Ceiling Fan with Light Kits" },
            { label: "Outdoor Solar Lights" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Hardware",
      sub: [
        {
          label: "Cabinet Hardware",
          child: [
            { label: "Drawer Pulls and Knobs" },
            { label: "Cabinet Hinges" },
            { label: "Magnetic Door Catches" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Safety and Security",
      sub: [
        {
          label: "Personal Protective Equipment",
          child: [
            { label: "Safety Glasses" },
            { label: "Work Gloves" },
            { label: "Ear Protection" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Paint and Finishes",
      sub: [
        {
          label: "Interior Paint",
          child: [
            { label: "Latex Paints (Various Colors)" },
            { label: "Paint Rollers and Brushes" },
            { label: "Painter's Tape" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
    {
      category: "Outdoor and Garden",
      sub: [
        {
          label: "Gardening Tools",
          child: [
            { label: "Pruning Shears" },
            { label: "Garden Hoses and Sprinklers" },
            { label: "Hand Trowels and Rakes" },
          ],
        },
      ],
      desc: "Equipped with a variety of bits and adjustable settings, it's the perfect tool for DIY enthusiasts and professionals alike.",
    },
  ];

  return (
    <>
      <div className="w-full h-full p-4 max-w-[1200px] m-auto my-20">
        <div className="divider divider-start text-xl font-black">
          Shop by Category
        </div>
        <div className="my-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryList.map((item, index) => (
            <div
              className="p-3 md:stats lg:p-0 shadow cursor-pointer hover:bg-base-200 transition-all ease-in-out duration-300"
              key={index}
            >
              <div className="md:w-full md:stat">
                <div className="md:stat-title font-bold text-sm">
                  {item.category}
                </div>
                <div className="md:flex">
                  <div className="md:stats-desc text-xs">
                    {item.sub &&
                      item.sub.map((subItem, subIndex) => (
                        <div key={subIndex}>
                          {subItem.child &&
                            subItem.child.map((child, childIndex) => (
                              <span className="hidden sm:block" key={childIndex}>
                                {childIndex < 2 ? `${child.label}, ` : "..."}
                              </span>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shopcategory;
