import Company from "../../pages/company/Company";
import CompanySlider from "../../pages/company_slider/CompanySlider";
import News from "../../pages/news/News";
import Services from "../../pages/services/Services";
import Slider from "../../pages/slider/Slider";
import Team from "../../pages/team/Team";

export const publicRoutes = [
  {
    path: "/",
    component: <Company />,
  },
  {
    path: "/company",
    component: <Company />,
  },
  {
    path: "/company_slider",
    component: <CompanySlider />,
  },
  {
    path: "/news",
    component: <News />,
  },
  {
    path: "/services",
    component: <Services />,
  },
  {
    path: "/slider",
    component: <Slider />,
  },
  {
    path: "/team",
    component: <Team />,
  },
];
