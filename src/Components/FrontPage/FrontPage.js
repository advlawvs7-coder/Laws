import Footer from "../Navbar/Footer";
import Header from "../Navbar/Header";
import AuthorSlider from "./AuthorSlider";
import BannerPage from "./LegalBanner";
import CareerHighlight from "./CareerHighlight";
import Internship from "./Internship";
import InternshipBanner from "./InternshipBanner";
import JoinRevolutionSection from "./JoinRevolutionSection";
import LatestJob from "./LatestJob";
import LibraryWebinarPage from "./LibraryWebinarPage";
import Opportunities from "./Opportunities";
import TestimonialPage from "./TestimonialCard";
import TopArticles from "./TopArticles";
import TopCompanies from "./TopCompanies";
import TopStories from "./TopBlogs";
import LegalBanner from "./LegalBanner";
import JobPage from "./homepage/jobPage/Jobpage";
import NewsletterSubscribe from "../footerpage/NewsletterSubscribe";
import ScrollPopupForm from "../../utils/PopupForm";
import LatestVideo from "./Video";
import HomeBannerUser from "./HomeBanner";

const FrontPage = () => {
  return (
    <>
      <Header />
      <ScrollPopupForm />
      <HomeBannerUser />
      {/* <LegalBanner /> */}
      <JobPage />
      <AuthorSlider />
      <LatestVideo />
      <InternshipBanner />
      <TopStories />
      <TopArticles />
      <Opportunities />
      <TopCompanies />
      <CareerHighlight />
      <JoinRevolutionSection />
      {/* <TestimonialPage /> */}
      <LibraryWebinarPage />
      <NewsletterSubscribe />
      <Footer />
    </>
  );
};

export default FrontPage;
