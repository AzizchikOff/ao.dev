import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Playground from "./components/Playground";
import CommandPalette from "./components/CommandPalette";
import Blog from "./components/Blog";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Admin from "./components/Admin";

export default function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/admin") return <Admin />;
  return (
    <>
      <div className="bg-grid" />
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Playground />
        <Blog />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
