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
import PortfolioAssistant from "./components/PortfolioAssistant";
import GitHubLive from "./components/GitHubLive";
import Admin from "./components/Admin";

let recorded=false;
export default function App() {
 useEffect(()=>{if(configured&&!recorded&&!window.location.pathname.startsWith("/admin")&&window.self===window.top){recorded=true;api("/rest/v1/rpc/record_portfolio_view",{method:"POST",body:{}}).catch(()=>{});}},[]);
 const [settings,setSettings]=useState({});
 useEffect(()=>{if(configured && !window.location.pathname.startsWith("/admin"))api("/rest/v1/portfolio_content?section=eq.settings&select=content").then(r=>setSettings(r[0]?.content||{})).catch(()=>{});},[]);
  if (window.location.pathname.replace(/\/$/, "") === "/admin") return <Admin />;
  const page=window.location.pathname.replace(/\/$/,"")||"/";
  const pages={"/":<><Hero/><GitHubLive/></>,"/about":<About/>,"/skills":<Skills/>,"/work":<Work/>,"/experience":<Experience/>,"/playground":<Playground/>,"/terminal":settings.showTerminal!==false?<DeveloperTerminal/>:null,"/blog":settings.showBlog!==false?<Blog/>:null,"/certificates":<Certificates/>,"/resume":settings.showResume!==false?<Resume/>:null,"/contact":<Contact/>,"/github":<GitHubLive/>};
  return (
    <div className="portfolio-site">
      <div className="bg-grid" />
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main className="portfolio-page">{Object.hasOwn(pages,page)?pages[page]:<section className="block"><div className="wrap"><h2>404</h2><a href="/">AO.DEV → Home</a></div></section>}</main>
      <Footer /><PortfolioAssistant />
    </div>
  );
}
