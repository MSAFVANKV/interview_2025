import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";


function NavigationList() {
   const NAVIGATION = [
    {
      kind: "page",
      segment: "/dashboard",
      title: "Dashboard",
      icon: <Icon icon="material-symbols:dashboard-rounded" />,
    },

   
    {
      kind: "page",
      segment: "/products",
      title: "Products",
      icon: <Icon icon="entypo:box" />,
      isChild: true,
      children: [
        { title: "Add New Product", segment: "/products/add" },
        { title: "All Products", segment: "/products/all" },
        // { title: "Category", segment: "/products/category" },
        // { title: "Brand", segment: "/products/brand" },
        // { title: "Product Reviews", segment: "/products/reviews" },
        // { title: "Colors", segment: "/products/colors" },
      ],
    },
   
  ];
  return {
    NAVIGATION
  }
}

export default NavigationList