(this.webpackJsonppomodoro=this.webpackJsonppomodoro||[]).push([[0],{14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(7),o=n.n(r),a=(n(14),n(2)),l=n(19),s=n(8),i=n(1),u=function(){var t=Object(c.useRef)(0),e=Object(c.useState)("25:00"),n=Object(a.a)(e,2),r=n[0],o=n[1],u=Object(c.useState)(10),b=Object(a.a)(u,2),d=b[0],j=b[1],m=Object(c.useState)("START"),x=Object(a.a)(m,2),f=x[0],O=x[1],p=Object(c.useState)(!1),h=Object(a.a)(p,2),v=h[0],g=h[1],N=Object(c.useState)(null),T=Object(a.a)(N,2),y=T[0],S=T[1],k=Object(l.a)(["completed"]),B=Object(a.a)(k,2),I=B[0],w=B[1],C=Object(l.a)(["total"]),R=Object(a.a)(C,2),A=R[0],P=R[1],z=Object(s.a)("https://jamiejcole.github.io/pomodoro/ringtone.mp3",{volume:5}),E=Object(a.a)(z,1)[0],J=function(){clearInterval(y),g(!1),O("START")},M=function(e){var n=e.currentTarget.name;0===t.current&&"custom"!==n&&(j(60*parseInt(n)),o(n+":00"))},D=function(){var e=t.current-1;t.current=e,o(q(e)),0===t.current&&(W(),J(),g(!1),O("START"));var n=setInterval((function(){var e=t.current-1;t.current=e,o(q(e)),0===t.current&&(W(),clearInterval(n),g(!1),E(),O("START"))}),1e3);S(n)},W=function(){var t=parseInt(A.total)+d;console.log(t,d),w("completed",parseInt(I.completed)+1,{path:"/"}),P("total",t)},q=function(t){var e=Math.floor(t/3600);t%=3600;var n,c,r,o=Math.floor(t/60);return t%=60,n=e<10?"0"+e:String(e),c=o<10?"0"+o:String(o),r=t<10?"0"+t:String(t),e<1?c+":"+r:n+":"+c+":"+r};return Object(c.useEffect)((function(){return void 0!==I.completed&&void 0!==A.total||(w("completed",0,{path:"/"}),P("total",0,{path:"/"})),function(){J()}}),[]),Object(i.jsxs)("div",{className:"h-screen w-full flex flex-col items-center justify-center bg-bgDark font-rubik gap-y-28 text-white",children:[Object(i.jsx)("span",{className:"text-4xl font-bold",children:"Pomodoro!"}),Object(i.jsxs)("div",{className:"flex flex-col items-center justify-center gap-y-10",children:[Object(i.jsxs)("div",{className:"w-425 h-300 bg-default rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-y-6 pt-7",children:[Object(i.jsxs)("div",{className:"flex gap-x-5 text-lg w-full px-7",children:[Object(i.jsx)("button",{onClick:function(t){return M(t)},name:"25",className:"timerBtn",children:"25m"}),Object(i.jsx)("button",{onClick:function(t){return M(t)},name:"10",className:"timerBtn",children:"10m"}),Object(i.jsx)("button",{onClick:function(t){return M(t)},name:"5",className:"timerBtn",children:"5m"}),Object(i.jsx)("button",{onClick:function(t){return M(t)},name:"custom",className:"timerBtn",children:"Custom"})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("span",{className:"text-7xl font-bold",children:r}),Object(i.jsx)("input",{className:"hidden"})]}),Object(i.jsxs)("div",{className:"flex flex-col",children:[Object(i.jsx)("button",{onClick:function(){!1===v&&0!==d?(t.current=d,g(!0),D(),O("STOP")):!0===v&&J()},className:"bg-buttonWhite text-buttonText py-5 px-8 rounded-xl border-2 duration-150 transition-all border-buttonBorder z-10 font-bold transform hover:translate-y-2 active:translate-y-5 active:bg-default",children:f}),Object(i.jsx)("div",{className:"bg-buttonBg h-14 rounded-xl border-2 border-buttonBorder z-5 transform -translate-y-10 font-bold text-buttonText"})]})]}),Object(i.jsxs)("div",{className:"flex flex-col gap-y-5 items-center justify-center",children:[Object(i.jsxs)("span",{className:"text-4xl font-bold",children:["Pomodoros Completed: ",I.completed]}),Object(i.jsxs)("span",{className:"text-4xl font-bold",children:["Total Time: ",q(parseInt(A.total))]})]})]})]})},b=n(18);o.a.render(Object(i.jsx)(b.a,{children:Object(i.jsx)(u,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.426a81ae.chunk.js.map