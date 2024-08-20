import { Routes, Route, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Punk } from "./pages/Punk/Punk";
import { TShirt } from "./components/design/TShirt";
import { Contacts } from "./pages/contacts/contacts";
import { ContactUs } from "./pages/contactUs/contactUs";
import { SaveMail } from "./pages/mail/saveMail";
import { SpinWheel } from "./pages/spinWheel/spinWheel";
import { SpinWheelSettings } from "./pages/spinWheelSettings/spinWheelSettings";

function App() {
  const location = useLocation();

  // Check if the pathname starts with '/spinWheel' and is not exactly '/spinWheelSettings'
  const hideNavbar = location.pathname.startsWith('/spinWheel') && location.pathname !== '/spinWheelSettings';

  return (
    <div className={styles.root}>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Punk />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/mail" element={<SaveMail />} />
        <Route path="/spinWheel/:iv/:data" element={<SpinWheel />} />
        <Route path="/spinWheelSettings" element={<SpinWheelSettings />} />
        <Route path="/Design1" element={<Punk />} />
        <Route path="/Design2" element={<Punk />} />
        <Route path="/Design3" element={<Punk />} />
        <Route path="/Design/T-Shirt" element={<TShirt />} />
      </Routes>
    </div>
  );
}

export default App;
