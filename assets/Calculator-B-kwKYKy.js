import{_ as B,e as P,f as h,g as N,c as T,b as a,a as l,w as r,h as L,v as q,i as k,j as o,n as C,k as F,l as I,m as R,p as j,q as A,o as M,d as i,T as U,F as G,s as Q,t as g,r as J,u as K,x as S,y as O,E as W,z as X}from"./index-CBPy5p0T.js";/* empty css                */const Z={class:"tw-max-w-[600px] tw-pb-20"},ee={class:"tw-mb-4 tw-flex tw-items-center"},te={class:"tw-mb-4"},se={key:0,class:"tw-bg-gray-200 tw-py-20 tw-text-center"},oe={key:1,class:"tw-border tw-border-gray-200 tw-py-6"},ae={class:"tw-px-6"},le={class:"tw-flex tw-flex-col tw-gap-y-2"},ne={class:""},re={class:""},ie={class:""},me=["innerHTML"],de={class:"tw-absolute tw-right-0 tw-top-0"},ue={class:"tw-text-base md:tw-text-2xl"},ce={class:"tw-text-2xl"},pe={__name:"Calculator",setup(fe){const p=P({dateTimeS:"",dateTimeE:""}),y=h(!1),f=h([]),$=N(()=>f.value.reduce((t,e)=>e.price?t+e.price:t,0)),V=(t,e)=>{const m=o(e).diff(o(t),"minute"),u=Math.floor(m/60),c=m%60;let n=u*20;return c>0&&(n+=c<=30?10:20),{hours:u,minutes:c,price:Math.min(n,200),originPrice:n}},v=t=>`${Number(t).toFixed(0).replace(/./g,(m,u,c)=>u&&m!=="."&&(c.length-u)%3===0?`, ${m}`.replace(/\s/g,""):m)}`,E=(t=1e3)=>new Promise(e=>{setTimeout(e,t)}),z=async()=>{y.value=!0,f.value=[];let{dateTimeS:t,dateTimeE:e}=p;if(!t||!e){y.value=!1;return}o(t).isAfter(e)?[t,e]=[e,t]:o(e).isBefore(t)&&([e,t]=[t,e]),p.dateTimeS=t,p.dateTimeE=e;const m=o(t).format("YYYY-MM-DD"),u=o(e).format("YYYY-MM-DD"),c=o(u).diff(o(m),"day");for(let n=0;n<=c;n++){const _=n===0?o(t).add(n,"day").format("YYYY-MM-DD HH:mm"):o(t).add(n,"day").format("YYYY-MM-DD 00:00"),Y=o(_).add(1,"day").format("YYYY-MM-DD 00:00"),x=o(Y).isAfter(e)?o(e).format("YYYY-MM-DD HH:mm"):o(Y).format("YYYY-MM-DD HH:mm"),{hours:d,minutes:w,price:H,originPrice:s}=V(_,x);if(d===0&&w===0)continue;let D=`${d} * 20 = ${d*20} 元`;w>0&&(w<=30?D=`${d} * 20 + 1 * 10 (未滿半小時，以半小時計) = ${d*20+1*10} 元`:D=`${d} * 20 + 1 * 20 (超過半小時，且未滿1小時，以1小時計) = ${d*20+1*20} 元`),s>200&&(D+="<br>超過每日上限 200 元，以 200 元計"),await E(600),f.value.push({type:"primary",size:"large",timestamp:o(_).format("YYYY-MM-DD HH:mm"),dateRange:`${_} ～ ${x}`,price:H,hours:d,minutes:w,priceCalcProcess:D}),await C(),b()}await E(600),f.value.push({type:"primary",size:"large",timestamp:o(e).format("YYYY-MM-DD HH:mm")}),await C(),b(),y.value=!1},b=()=>{document.querySelector(".el-main").scrollTo({top:document.querySelector(".el-main").scrollHeight,behavior:"smooth"})};return(t,e)=>{const m=F,u=J("Search"),c=K,n=I,_=R,Y=O,x=W,d=X,w=j,H=A;return M(),T("div",Z,[a("div",ee,[l(m,{class:"tw-flex-1",modelValue:p.dateTimeS,"onUpdate:modelValue":e[0]||(e[0]=s=>p.dateTimeS=s),type:"datetime",placeholder:"起始日期",format:"YYYY-MM-DD HH:mm","value-format":"YYYY-MM-DD HH:mm:00"},null,8,["modelValue"]),e[2]||(e[2]=a("span",{class:"tw-flex-none tw-px-2"},"-",-1)),l(m,{class:"tw-flex-1",modelValue:p.dateTimeE,"onUpdate:modelValue":e[1]||(e[1]=s=>p.dateTimeE=s),type:"datetime",placeholder:"結束日期",format:"YYYY-MM-DD HH:mm","value-format":"YYYY-MM-DD HH:mm:00"},null,8,["modelValue"])]),a("div",te,[l(n,{class:"tw-w-full",type:"primary",onClick:z},{default:r(()=>[l(c,{size:16},{default:r(()=>[l(u)]),_:1}),e[3]||(e[3]=a("span",{class:"tw-text-base"},"查詢",-1))]),_:1})]),f.value.length<=0&&!y.value?(M(),T("div",se,[l(_,{type:"danger",class:"!tw-text-lg"},{default:r(()=>e[4]||(e[4]=[i(" 請先選擇起迄時間 ")])),_:1})])):f.value.length>0?(M(),T("div",oe,[a("div",ae,[l(w,null,{default:r(()=>[l(U,{name:"fade"},{default:r(()=>[(M(!0),T(G,null,Q(f.value,(s,D)=>(M(),S(d,{key:D,placement:"top",icon:s.icon,type:s.type,color:s.color,size:s.size,hollow:s.hollow,timestamp:s.timestamp},{default:r(()=>[s.dateRange?(M(),S(x,{key:0},{default:r(()=>[a("div",le,[a("p",ne,g(s.dateRange),1),a("p",re,[e[5]||(e[5]=i(" 共 ")),l(Y,{type:"primary"},{default:r(()=>[i(g(s.hours),1)]),_:2},1024),e[6]||(e[6]=i(" 小時 ")),l(Y,{type:"primary"},{default:r(()=>[i(g(s.minutes),1)]),_:2},1024),e[7]||(e[7]=i(" 分 "))]),a("p",ie,[e[8]||(e[8]=i(" 金額為:")),e[9]||(e[9]=a("br",null,null,-1)),a("span",{class:"tw-block tw-pl-4",innerHTML:s.priceCalcProcess},null,8,me)]),a("p",de,[e[10]||(e[10]=i(" 小計 $ ")),l(Y,{type:"danger"},{default:r(()=>[i(g(v(s.price)),1)]),_:2},1024),e[11]||(e[11]=i(" 元 "))])])]),_:2},1024)):k("",!0)]),_:2},1032,["icon","type","color","size","hollow","timestamp"]))),128))]),_:1})]),_:1})]),L(l(H,null,{default:r(()=>[a("p",ue,[e[12]||(e[12]=i(" 總計 $ ")),l(_,{type:"danger"},{default:r(()=>[a("span",ce,g(v($.value)),1)]),_:1}),e[13]||(e[13]=i(" 元 "))])]),_:1},512),[[q,!y.value]])])):k("",!0)])}}},we=B(pe,[["__scopeId","data-v-fa299d1c"]]);export{we as default};
