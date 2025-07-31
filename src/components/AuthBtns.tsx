import { motion } from "framer-motion";
import { User, UserPlus } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const AuthBtns = () => {
  const { user, isAuthenticated, loginWithPopup, loginWithRedirect, logout } =
    useAuth0();

  const Logout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  const [toastOpen, setToastOpen] = useState(false);

  const TryLogin = async () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return loginWithRedirect();

    try {
      await loginWithPopup();
    } catch (e) {
      console.error(e);
      setToastOpen(true);
      setTimeout(() => loginWithRedirect(), 3000);
    }
  };

  const TryLogout = async () => {
    try {
      await Logout();
    } catch (e) {
      console.error(e);
      alert("Couldn't Logout");
    }
  };

  const GoToProfile = () => {
    console.log("Profile Selected");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      {!isAuthenticated && (
        <>
          {/* Login Btn */}
          <motion.button
            onClick={TryLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm sm:text-base"
            style={{
              borderColor: "black",
              color: "black",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <User size={16} />
            <span>Log In</span>
          </motion.button>

          {/* Register Btn */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-secondary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            <UserPlus size={16} />
            <span>Register</span>
          </motion.button>
        </>
      )}

      {isAuthenticated && (
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10 h-10"
            src={user?.picture}
            alt={user?.name || "User"}
          />
          <Dropdown
            options={[
              {
                label: user?.name || "User",
                action: () => {},
                disabled: true,
                isTitle: true,
              },
              { label: "Profile", action: GoToProfile },
              {
                label: "Settings",
                action: () => console.log("Settings hit"),
              },
              { label: "Logout", action: TryLogout },
            ]}
          />
        </div>
      )}

      {/*Toast*/}
      {toastOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-[1000] text-sm sm:text-base">
          Popup login failed, redirecting...
        </div>
      )}
    </div>
  );
};

export default AuthBtns;
