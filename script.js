const BASE="https://marksueportfolio.wordpress.com/wp-content/uploads/";
const POSTERS=["2026/01/zoning-laws-in-the-philippines-what-every-property-owner-should-know.png","2026/01/the-future-of-smart-cities-in-the-philippines-are-we-ready.jpg","2026/01/november-2025-licensure-exam-passers.png","2026/01/1.png","2026/01/3.png","2026/01/getting-the-best-deal-for-your-property.png","2026/01/balancing-profit-and-social-responsibility.png","2026/01/causes-and-possible-solutions.png","2026/01/why-a-license-to-sell-is-non-negotiable-in-property-sales-2.png","2026/01/estate-planning-how-to-pass-on-your-property-to-your-heirs.png","2026/01/common-real-estate-scams-in-the-philippines-how-to-avoid-them.png","2026/01/home-renovation-tips-that-can-increase-your-propertys-resale-value-3.png","2026/01/the-rise-of-smart-homes-in-the-philippines-should-you-invest.png","2024/07/2-1-1.jpg","2024/07/updated-3-1.jpg","2024/07/1-1-1.jpg","2024/07/how-to-legally-evict-tenants-in-the-philippines-1.png","2024/07/best-ways-to-market-your-property-online-offline-1.png","2024/07/what-is-a-deed-of-sale-and-why-is-it-important-1.png","2024/07/dealing-with-squatters-your-legal-rights-as-a-property-owner-1.png","2024/07/how-to-handle-property-disputes-with-neighbors-or-family-members.png","2024/07/what-is-blockchain-and-how-does-it-work-in-real-estate-1.png","2024/07/can-foreigners-buy-property-in-the-philippines-1.png","2024/07/understanding-property-taxes-in-the-philippines-a-guide-for-homeowners-and-investors.png","2024/07/why-more-filipinos-are-choosing-condo-living.png","2024/07/the-philippine-real-estate-market-in-2025-growth-challenges-and-whats-next.jpg","2024/07/feb-4-1.jpg"];
const LOGOS=["2024/07/1-4.png","2024/07/2-5.png","2024/07/2-6.png"];
const title=(p,cat,n)=>`${cat} ${n}`;
const ALL=[...POSTERS.map((p,i)=>({src:BASE+p,cat:"Posters",title:title(p,"Poster",i+1)})),...LOGOS.map((p,i)=>({src:BASE+p,cat:"Logos",title:title(p,"Logo",i+1)}))];
const $=id=>document.getElementById(id);
const grid=$("grid"),chips=$("chips"),root=document.documentElement;
let view=ALL,io;
// theme
const tb=$("theme"),setT=t=>{root.dataset.theme=t;tb.textContent=t==="dark"?"☀":"☾";try{localStorage.setItem("theme",t)}catch(e){}};
setT(root.dataset.theme);tb.onclick=()=>setT(root.dataset.theme==="dark"?"light":"dark");
$("year").textContent=new Date().getFullYear();
// gallery
function render(cat){
  view=cat==="All"?ALL:ALL.filter(i=>i.cat===cat);
  grid.innerHTML="";$("count").textContent=`${view.length} works`;
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -6% 0px"});
  view.forEach((it,i)=>{
    const b=document.createElement("button");b.className="card"+(it.cat==="Logos"?" logo":"");b.style.transitionDelay=(i%4)*70+"ms";
    b.setAttribute("aria-label","View "+it.title);
    const im=new Image();im.src=it.src;im.alt=it.title;im.loading="lazy";im.decoding="async";
    im.onload=()=>{im.classList.add("ok");b.style.animation="none"};
    const sp=document.createElement("span");sp.textContent=it.title;
    b.append(im,sp);b.onclick=()=>open(i);grid.appendChild(b);io.observe(b);
  });
}
["All","Posters","Logos"].forEach((c,i)=>{
  const b=document.createElement("button");b.textContent=c;b.setAttribute("aria-pressed",i===0);
  b.onclick=()=>{[...chips.children].forEach(x=>x.setAttribute("aria-pressed",x===b));render(c)};
  chips.appendChild(b);
});
render("All");
// lightbox
const lb=$("lb"),st=$("stage"),img=$("img");
let idx=0,z=1,x=0,y=0,last=null,sx=0,sy=0,moved=0,t0=0,tap=0,down=false;
const apply=()=>{img.style.transform=`translate(${x}px,${y}px) scale(${z})`;$("zl").textContent=Math.round(z*100)+"%";st.classList.toggle("z",z>1)};
const setZ=n=>{z=Math.min(6,Math.max(1,n));if(z===1)x=y=0;apply()};
function show(i){
  idx=(i+view.length)%view.length;const it=view[idx];
  img.src=it.src;img.alt=it.title;$("cap").textContent=it.title;$("cnt").textContent=`${idx+1} / ${view.length}`;$("orig").href=it.src;
  z=1;x=y=0;apply();
  [1,-1].forEach(d=>{new Image().src=view[(idx+d+view.length)%view.length].src});
}
function open(i){last=document.activeElement;lb.hidden=false;document.body.style.overflow="hidden";show(i);$("x").focus()}
function close(){lb.hidden=true;document.body.style.overflow="";last&&last.focus()}
$("x").onclick=close;$("prev").onclick=()=>show(idx-1);$("next").onclick=()=>show(idx+1);
$("zi").onclick=()=>setZ(z*1.4);$("zo").onclick=()=>setZ(z/1.4);$("zr").onclick=()=>setZ(1);
st.addEventListener("wheel",e=>{e.preventDefault();setZ(z*(e.deltaY<0?1.15:.87))},{passive:false});
st.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sy=e.clientY;moved=0;t0=Date.now();st.setPointerCapture(e.pointerId);st.classList.add("drag")});
st.addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-sx,dy=e.clientY-sy;moved+=Math.abs(dx)+Math.abs(dy);sx=e.clientX;sy=e.clientY;if(z>1){x+=dx;y+=dy;apply()}});
st.addEventListener("pointerup",e=>{
  down=false;st.classList.remove("drag");
  if(moved<8){const n=Date.now();if(n-tap<320){setZ(z>1?1:2.5);tap=0}else tap=n}
});
let swx=0;st.addEventListener("touchstart",e=>{swx=e.touches[0].clientX},{passive:true});
st.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-swx;if(z===1&&Math.abs(d)>70)show(idx+(d<0?1:-1))},{passive:true});
addEventListener("keydown",e=>{if(lb.hidden)return;({Escape:close,ArrowLeft:()=>show(idx-1),ArrowRight:()=>show(idx+1),"+":()=>setZ(z*1.4),"=":()=>setZ(z*1.4),"-":()=>setZ(z/1.4),0:()=>setZ(1)})[e.key]?.()});
