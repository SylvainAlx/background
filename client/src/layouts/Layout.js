import Header from "./HeaderLayout";
import Footer from "./FooterLayout";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};
