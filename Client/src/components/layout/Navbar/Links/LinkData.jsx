import { FaHeadphonesAlt, FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

export const publicLinks = [
  {
    label: "Home",
    slug: "/",
    icon: <FaHome />,
  },
  {
    label: "Become Seller",
    slug: "/business/register",
    icon: <HiHomeModern />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];

export const sellerLinks = [
  {
    label: "Pending",
    slug: "/seller-dashboard/pendingorders",
    icon: null,
  },
  {
    label: "Accepted",
    slug: "/seller-dashboard/acceptedorders",
    icon: null,
  },
  {
    label: "Products",
    slug: "/seller-products",
    icon: null,
  },
  {
    label: "Add Product",
    slug: "/seller-create-products",
    icon: null,
  },
  {
    label: "Profile",
    slug: "/seller/profile",
    icon: <FaRegCircleUser />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];

export const adminLinks = [
  {
    label: "Products",
    slug: "/admin",
    icon: null,
  },
  {
    label: "Categories",
    slug: "/admin-categories",
    icon: null,
  },
  {
    label: "Users",
    slug: "/admin-users",
    icon: null,
  },
];

export const userLinks = [
  {
    label: "Home",
    slug: "/",
    icon: null,
  },
  {
    label: "Wishlist",
    slug: "/wishlist",
    icon: <FaHeart />,
  },
  {
    label: "Cart",
    slug: "/cart",
    icon: <FaShoppingCart />,
  },
  {
    label: "Profile",
    slug: "/profile",
    icon: <FaUserAlt />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];
