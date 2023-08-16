import NavbarLinks from "./NavbarLinks";
import MobileNavigation from "./MobileNavigation";

const Navigation = () => {
  return (
    <div className="">


      <div className="hidden sm:block">
        <NavbarLinks />
      </div>

      <div className="sm:hidden">
        <MobileNavigation/>
      </div>
      

    </div>
  );
};

export default Navigation;
