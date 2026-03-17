import Navbar from '../common/Navbar/Navbar';
import Footer from '../common/Footer/Footer';
import WhatsAppButton from '../common/WhatsAppButton/WhatsAppButton';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Layout;
