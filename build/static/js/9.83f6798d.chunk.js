(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[9],{135:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var a=o(83),n=o(169);function c(){var e=localStorage.getItem("refresh_token");return function(t){fetch("".concat("https://ec2-54-169-51-72.ap-southeast-1.compute.amazonaws.com/api/v1","/auth/refresh"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:e})}).then((function(e){if(!e.ok){if(500!==e.status)throw Error(e.statusText);var o=localStorage.getItem("id");t(Object(n.a)(o,{status:null})),localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("username"),localStorage.removeItem("role"),localStorage.removeItem("id"),localStorage.removeItem("contest_id"),localStorage.removeItem("schedule_id"),t(Object(a.d)())}return e.json()})).then((function(e){localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.setItem("access_token",e.accessToken),localStorage.setItem("refresh_token",e.refreshToken)})).catch((function(e){console.log("error")}))}}},169:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var a=o(10),n=o(135);function c(e,t){var o="Bearer "+localStorage.getItem("access_token");return function(r){r(Object(a.C)()),fetch("".concat("https://ec2-54-169-51-72.ap-southeast-1.compute.amazonaws.com/api/v1","/user/status/").concat(e),{method:"PUT",headers:{Authorization:o,"Content-Type":"application/json","Access-Control-Allow-Origin":"".concat("http://localhost:3000"),"Access-Control-Allow-Credentials":"true"},body:JSON.stringify(t)}).then((function(o){if(o.ok)return o;if(403!==o.status)throw Error(o.statusText);r(Object(n.a)()),r(c(e,t))})).then((function(o){console.log(o),console.log(e),r(Object(a.D)(t))})).catch((function(e){r(Object(a.B)(e)),console.log("error")}))}}},719:function(e,t,o){},750:function(e,t,o){"use strict";o.r(t);var a=o(2),n=o.n(a),c=o(79),r=o(8),s=o(135);o(719),t.default=function(){var e=Object(c.b)(),t=window.location.search,o=new URLSearchParams(t).get("ids");return console.log(o),Object(a.useEffect)((function(){e(function e(t){var o="Bearer "+localStorage.getItem("access_token");return function(a){a(Object(r.F)()),fetch("".concat("https://ec2-54-169-51-72.ap-southeast-1.compute.amazonaws.com/api/v1","/user-register-join-semester/payment/v2?ids=").concat(t),{method:"POST",headers:{Authorization:o,"Content-Type":"application/json","Access-Control-Allow-Origin":"".concat("http://localhost:3000"),"Access-Control-Allow-Credentials":"true"}}).then((function(o){if(o.ok)return o;if(403!==o.status)throw Error(o.statusText);a(Object(s.a)()),a(e(t))})).then((function(e){console.log(e)})).catch((function(e){a(Object(r.E)(e)),console.log("error")}))}}(o))}),[e,o]),n.a.createElement(a.Fragment,null,n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 mx-auto mt-5"},n.a.createElement("div",{className:"payment"},n.a.createElement("div",{className:"payment_header"},n.a.createElement("div",{className:"check"},n.a.createElement("i",{className:"fa fa-check","aria-hidden":"true"}))),n.a.createElement("div",{className:"content"},n.a.createElement("h1",null,"Thanh to\xe1n th\xe0nh c\xf4ng !"),n.a.createElement("p",null,"Ch\xfac m\u1eebng b\u1ea1n \u0111\xe3 thanh to\xe1n th\xe0nh c\xf4ng \u0111\u01a1n h\xe0ng. Vui l\xf2ng l\xf2ng quay l\u1ea1i trang ch\u1ee7 \u0111\u1ec3 tr\u1ea3i nghi\u1ec7m!"),n.a.createElement("a",{href:"/Home"},"Go to Home")))))))}}}]);
//# sourceMappingURL=9.83f6798d.chunk.js.map