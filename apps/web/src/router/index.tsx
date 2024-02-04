import { RouteObject, createBrowserRouter } from "react-router-dom"
import Home from "../views/Home"
import Body from "@/views/Home/Body"
import Login from "../views/Login"
import createBrowserRouterWithPermission from "./Permission"
// import { RouteObjectWithPermission } from "./Permission/types"
import Upload from "@/components/Upload"
// import Image from "@/components/Images/Image"
import { Image, CustomLazyImage } from "@/components/Images"
import { Swiper, SwiperSlide } from "@/components/swiper/"
const target =
  "http://c.hiphotos.baidu.com/image/pic/item/9c16fdfaaf51f3de1e296fa390eef01f3b29795a.jpg"
const loaded =
  "http://d.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01f119945cbe2fe9925bc317d2a.jpg"
const unloaded =
  "https://i1.hdslb.com/bfs/archive/0907493383f6628d20e6e1e314e656daffd71f62.jpg@412w_232h_1c_!web-popular.avif"
const fallbackNode = <div>fallback</div>

const placeholder =
  "https://tse3-mm.cn.bing.net/th/id/OIP-C.oKnzLzyQ8T_zRkmBF1CWuQHaHa?w=184&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7"

const placeholderNode = <div>placeholder Node</div>

const routerObjectsWithPermission: RouteObject[] = [
  {
    path: "/*",
    id: "root",
    element: <Home />,
    children: [
      {
        path: "*",
        element: <Body />,
        // auth: true,
        // redirect: "/login",
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/first",
    element: (
      <Upload
        shape="round"
        action="http://localhost:3000/api/upload"
        type=""
      ></Upload>
    ),
  },
  {
    path: "/second",
    element: (
      <Image src={unloaded} fallback={unloaded} placeholder={unloaded}></Image>
    ),
  },
  {
    path: "/third",
    element: (
      <>
        <CustomLazyImage
          src={loaded}
          // fallbackSrc={loaded}
          // placeholderSrc={placeholder}
          fallbackNode={fallbackNode}
          placeholderNode={placeholderNode}
        />
      </>
    ),
  },
  {
    path: "/four",
    element: (
      <Swiper className="h-[200px] w-[200px]">
        <SwiperSlide>
          {({ isActive }) => (
            <CustomLazyImage
              className="object-contain h-full w-full"
              src={target}
              preload={isActive}
              fallbackNode={fallbackNode}
              placeholderNode={placeholderNode}
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <CustomLazyImage
              className="object-contain h-full w-full"
              src={loaded}
              preload={isActive}
              fallbackNode={fallbackNode}
              placeholderNode={placeholderNode}
            />
          )}
        </SwiperSlide>
      </Swiper>
    ),
  },
]

const routerObjects: RouteObject[] = createBrowserRouterWithPermission(
  routerObjectsWithPermission
)

const routes = createBrowserRouter(routerObjects)

export default routes
