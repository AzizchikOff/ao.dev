import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const browser=await chromium.launch({headless:true});
await mkdir("screenshots",{recursive:true});
const failures=[];
try {
 for(const [label,width,height] of [["desktop",1648,928],["mobile",390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
  let route="";
  page.on("pageerror",e=>failures.push(label+" "+route+": "+e.message));
  for(const path of ["/","/about","/work","/certificates","/terminal","/admin"]){
   route=path;
   try{
    const response=await page.goto("http://127.0.0.1:4173"+path,{waitUntil:"domcontentloaded"});
    if(!response?.ok())throw Error("HTTP "+response?.status());
    await page.locator("main").first().waitFor({state:"visible"});
    await page.waitForTimeout(1200);
    await page.screenshot({path:"screenshots/"+label+"-"+(path.slice(1)||"home")+".png",fullPage:true,animations:"disabled"});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+4);
    if(overflow)failures.push(label+" "+path+": horizontal overflow");
   }catch(e){failures.push(label+" "+path+": "+e.message)}
  }
  await page.close();
 }
}finally{await browser.close()}
if(failures.length){console.error(failures.join("\n"));process.exitCode=1}
