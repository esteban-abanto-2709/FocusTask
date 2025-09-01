import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";

const routes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
];

export default routes;