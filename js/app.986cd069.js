(function(t){function e(e){for(var o,l,a=e[0],r=e[1],u=e[2],c=0,p=[];c<a.length;c++)l=a[c],n[l]&&p.push(n[l][0]),n[l]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,u||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],o=!0,a=1;a<i.length;a++){var r=i[a];0!==n[r]&&(o=!1)}o&&(s.splice(e--,1),t=l(l.s=i[0]))}return t}var o={},n={app:0},s=[];function l(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,l),i.l=!0,i.exports}l.m=t,l.c=o,l.d=function(t,e,i){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(l.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)l.d(i,o,function(e){return t[e]}.bind(null,o));return i},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/div2-skill-mod-poc/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],r=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var d=r;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var o=i("2b0e"),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app"},[i("h1",{staticStyle:{"margin-bottom":"0"}},[t._v("\n    The Division 2 - Skill Mod Proof of Concept\n  ")]),t._m(0),i("div",{staticClass:"player block"},[i("h2",[t._v("Player Skill Power: "+t._s(t.player.skillPower))]),i("div",{staticClass:"btn-group"},[i("button",{attrs:{disabled:0===t.player.skillPower},on:{click:function(e){t.player.skillPower=0}}},[t._v("\n        0 Skill Power\n      ")]),i("button",{attrs:{disabled:771===t.player.skillPower},on:{click:function(e){t.player.skillPower=771}}},[t._v("\n        771 Skill Power\n      ")]),i("button",{attrs:{disabled:1197===t.player.skillPower},on:{click:function(e){t.player.skillPower=1197}}},[t._v("\n        1197 Skill Power\n      ")]),i("button",{attrs:{disabled:2083===t.player.skillPower},on:{click:function(e){t.player.skillPower=2083}}},[t._v("\n        2083 Skill Power\n      ")])])]),i("div",{staticClass:"skills block"},[i("div",{staticClass:"skill-desc block"},[i("h2",[t._v("Skill: "+t._s(t.skill.name))]),i("div",[i("div",{class:[t.totalDamage>t.skill.damage&&"bonus"]},[i("strong",[t._v("\n            Total Damage: "+t._s(t.totalDamage.toFixed(2))+" / second\n          ")])]),i("div",{class:[t.totalAmmo>t.skill.ammo&&"bonus"]},[i("strong",[t._v(" Total Ammo: "+t._s(t.totalAmmo.toFixed(2))+" ")])]),i("div",{class:[t.totalRadius>t.skill.radius&&"bonus"]},[i("strong",[t._v(" Total Radius: "+t._s(t.totalRadius.toFixed(2))+" m ")])])])]),i("div",{staticClass:"grid"},[i("div",{staticClass:"slots"},[i("ul",t._l(t.skill.slots,function(e){return i("li",{key:e.id},[i("a",{class:["box",t.activeSlot&&t.activeSlot.id===e.id&&"active"],attrs:{role:"button"},on:{click:function(i){return t.setActiveSlot(e.id)}}},[i("strong",{staticClass:"box-label"},[t._v(t._s(e.name))]),i("div",[e.equipped?i("span",[t._v("\n                  "+t._s(t.getMod(e.equipped).name)+"\n                ")]):i("i",{staticClass:"muted"},[t._v("\n                  Nothing equipped\n                ")])]),e.equipped?i("div",{staticClass:"bonus"},[i("strong",[t._v("\n                  +\n                  "+t._s(t.getTotalModBonus(t.getMod(e.equipped).id).toFixed(2))+"\n                  "+t._s(t.getMod(e.equipped).suffix)+"\n                ")])]):t._e()])])}),0)]),t.activeSlot?i("div",{staticClass:"slot-options"},[i("hr",{staticClass:"mobile-only",staticStyle:{margin:"0 0 30px"}}),i("ul",{staticClass:"mods"},t._l(t.mods,function(e){return i("li",{key:e.id,staticClass:"block"},[i("a",{class:["box",t.isModEquippedForOtherSlot(e.id,t.activeSlot.id)&&"disabled",t.isModEquippedForSlot(e.id,t.activeSlot.id)&&"active"],attrs:{role:"button"},on:{click:function(i){return t.setSlotMod(t.activeSlot.id,e.id)}}},[i("strong",{staticClass:"box-label"},[t._v(t._s(e.name))]),i("div",[t._v("+ "+t._s(e.baseValue)+" "+t._s(e.suffix)+" (Base Value)")]),i("div",{staticClass:"bonus"},[t._v("\n                + "+t._s(e.scale(t.player.skillPower).toFixed(2))+"\n                "+t._s(e.suffix)+" ("+t._s(e.scale(100).toFixed(2))+" for every\n                100 Skill Power)\n              ")]),i("hr"),i("div",{staticClass:"bonus"},[i("strong",[t._v("\n                  +\n                  "+t._s(t.getTotalModBonus(e.id).toFixed(2))+"\n                  "+t._s(e.suffix)+"\n                ")])])])])}),0)]):t._e()])])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"block"},[i("a",{attrs:{href:"https://twitter.com/murimuffin5"}},[t._v("by @murimuffin5")])])}],l=(i("7514"),{name:"app",methods:{getMod:function(t){return this.mods.find(function(e){return e.id===t})},getTotalModBonus:function(t){var e=this.mods.find(function(e){return e.id===t});if(e)return e.baseValue+e.scale(this.player.skillPower)},getEquippedModsForAttribute:function(t){var e=this;return this.mods.filter(function(i){return e.isModEquipped(i.id)&&i.attribute===t})},setActiveSlot:function(t){this.activeSlotId=t},setSlotMod:function(t,e){var i=this.skill.slots.find(function(e){return e.id===t});i&&(i.equipped===e?i.equipped=null:i.equipped=e)},isModEquippedForOtherSlot:function(t,e){return this.skill.slots.filter(function(t){return t.id!==e}).some(function(e){return e.equipped===t})},isModEquippedForSlot:function(t,e){var i=this.skill.slots.find(function(t){return t.id===e});if(i)return i.equipped===t},isModEquipped:function(t){return this.skill.slots.some(function(e){return e.equipped===t})}},computed:{activeSlot:function(){var t=this;return this.skill.slots.find(function(e){return e.id===t.activeSlotId})},totalDamage:function(){var t=this,e=this.getEquippedModsForAttribute("damage"),i=e.reduce(function(e,i){return e+(i.baseValue+i.scale(t.player.skillPower))/100},1);return this.skill.damage*i},totalAmmo:function(){var t=this,e=this.getEquippedModsForAttribute("ammo"),i=e.reduce(function(e,i){return e+(i.baseValue+i.scale(t.player.skillPower))},0);return this.skill.ammo+i},totalRadius:function(){var t=this,e=this.getEquippedModsForAttribute("radius"),i=e.reduce(function(e,i){return e+(i.baseValue+i.scale(t.player.skillPower))/100},1);return this.skill.radius*i}},data:function(){return{activeSlotId:null,player:{skillPower:771},mods:[{id:"mod-a",attribute:"damage",name:"Mod: Damage (High Scaling / Low Base)",suffix:"% Damage",type:"multiply",baseValue:5,scale:function(t){return t/50}},{id:"mod-a2",attribute:"damage",name:"Mod: Damage (Low Scaling / High Base)",suffix:"% Damage",baseValue:10,scale:function(t){return t/300}},{id:"mod-b",attribute:"ammo",name:"Mod: Ammo",suffix:"Ammo",baseValue:3,scale:function(t){return t/350}},{id:"mod-c",attribute:"radius",name:"Mod: Radius",suffix:"% Radius",baseValue:10,scale:function(t){return t/50}}],skill:{name:"Chem Launcher - Oxidizer",ammo:3,damage:12e3,radius:5,slots:[{id:"slot1",name:"Slot A",equipped:null},{id:"slot2",name:"Slot B",equipped:null}]}}}}),a=l,r=(i("5c0b"),i("2877")),u=Object(r["a"])(a,n,s,!1,null,null,null),d=u.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(d)}}).$mount("#app")},"5c0b":function(t,e,i){"use strict";var o=i("5e27"),n=i.n(o);n.a},"5e27":function(t,e,i){}});
//# sourceMappingURL=app.986cd069.js.map