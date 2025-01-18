import NavbarLayout from "../sections/layouts/drawer";
import ScrollToTopButton from "../utils/hooks/ScrollToTopButton";

function NavbarContainer() {
  return (
    <>
      <ScrollToTopButton />
      <NavbarLayout />
    </>
  );
}

export default NavbarContainer;
