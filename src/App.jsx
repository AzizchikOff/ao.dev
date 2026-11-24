import {useState,useEffect} from "react";
import {api,configured} from "./lib/portfolioApi";
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
import DeveloperTerminal from "./components/DeveloperTerminal";
import Admin from "./components/Admin";

export default function App() {
 const [settings,setSettings]=useState({});
 useEffect(()=>{if(configured && !window.location.pathname.startsWith("/admin"))api("/rest/v1/portfolio_content?section=eq.settings&select=content").then(r=>setSettings(r[0]?.content||{})).catch(()=>{});},[]);
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
        {settings.showTerminal!==false && <DeveloperTerminal />}
        {settings.showBlog!==false && <Blog />}
        <Certificates />
        {settings.showResume!==false && <Resume />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
