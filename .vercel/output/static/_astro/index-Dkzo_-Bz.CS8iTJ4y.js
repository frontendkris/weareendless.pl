import{j as a}from"./jsx-runtime.CzgMDNMm.js";import{u as P,a as b,P as g,_ as w,j as B,k as L,i as k,l as A,m as C,C as T,e as S,c as D,f as G,g as H,B as O,h as W,A as E}from"./studio-component.3LyLIWOn.js";import{r as f}from"./index.DQ2WTIsS.js";import"./client.B3CCqPsx.js";var I=Object.freeze,z=Object.defineProperty,F=(o,s)=>I(z(o,"raw",{value:I(s||o.slice())})),y;const R=P.hr(y||(y=F([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function K(o){const{childItemId:s,items:t,isActive:i,layout:c,showIcons:r,title:l}=o,{collapsed:u}=B(),d=L(t?.filter(e=>e.type!=="divider")),h=f.useCallback(e=>{var n;return((n=t?.find((p,x)=>x===e))==null?void 0:n.type)==="divider"},[t]),m=f.useCallback(e=>{var n;const p=(n=e.displayOptions)==null?void 0:n.showIcon;return typeof p<"u"?p!==!1:r!==!1},[r]),v=f.useCallback((e,n)=>{const{virtualIndex:p}=n;if(e.type==="divider")return a.jsx(k,{marginBottom:1,children:a.jsx(R,{})},"divider-".concat(p));const x=!i&&s===e.id,j=i&&s===e.id,_=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return a.jsx(A,{icon:m(e)?e.icon:!1,id:e.id,layout:c,marginBottom:1,pressed:x,schemaType:e.schemaType,selected:j,title:d(e).title,value:_},e.id)},[s,d,i,c,m]);return a.jsx(C,{overflow:u?"hidden":"auto",children:t&&t.length>0&&a.jsx(T,{activeItemDataAttr:"data-hovered",ariaLabel:l,canReceiveFocus:!0,getItemDisabled:h,itemHeight:51,items:t,onlyShowSelectionWhenActive:!0,paddingBottom:1,paddingX:3,renderItem:v,wrapAround:!1})})}const M=o=>{let{index:s,menuItems:t,menuItemGroups:i,title:c}=o;const{features:r}=S(),{collapsed:l,isLast:u}=D(),d=u&&!l?-1:0;return a.jsx(G,{actions:a.jsx(H,{menuItems:t,menuItemGroups:i}),backButton:r.backButton&&s>0&&a.jsx(O,{as:W,"data-as":"a",icon:E,mode:"bleed",tooltipProps:{content:"Back"}}),tabIndex:d,title:c})};function N(o){const{childItemId:s,index:t,isActive:i,isSelected:c,pane:r,paneKey:l}=o,{defaultLayout:u,displayOptions:d,items:h,menuItems:m,menuItemGroups:v}=r,e=d?.showIcons!==!1,{title:n}=b(r);return a.jsxs(g,{currentMaxWidth:350,"data-testid":"structure-tool-list-pane","data-ui":"ListPane",id:l,maxWidth:640,minWidth:320,selected:c,children:[w,a.jsx(M,{index:t,menuItems:m,menuItemGroups:v,title:n}),a.jsx(K,{childItemId:s,isActive:i,items:h,layout:u,showIcons:e,title:n},l)]})}export{N as default};
