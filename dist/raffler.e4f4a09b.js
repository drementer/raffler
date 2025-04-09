!function(){class e{constructor(e){this.relative=e,this.element=this.relative.querySelector("[bubble-element]"),this.anchors=[...this.relative.querySelectorAll("[bubble-anchor]")],this.defaultAnchor=this.relative.querySelector("[default-bubble-anchor]"),this.defaultAnchor||(this.defaultAnchor=this.anchors[0]),this.init()}static activeClass="-active";get relativeRect(){return this.relative.getBoundingClientRect()}get elementRect(){return this.element.getBoundingClientRect()}get defaultAnchorRect(){return this.defaultAnchor.getBoundingClientRect()}get defaultPosition(){return{left:this.defaultAnchorRect.left-this.relativeRect.left,top:this.defaultAnchorRect.top-this.relativeRect.top}}set position({left:e,top:t}){this.element.style.left=`${e}px`,this.element.style.top=`${t}px`}set dimension({width:e,height:t}){this.element.style.width=`${e}px`,this.element.style.height=`${t}px`}createBubble(){let e=Object.assign(document.createElement("span"),{classList:["bubble"]});this.relative.appendChild(e),this.element=e}getDimension(e){return{width:e.offsetWidth,height:e.offsetHeight}}calculatePosition(e){let t=e.getBoundingClientRect();return{left:t.left-this.relativeRect.left,top:t.top-this.relativeRect.top}}updatePosition(e){this.position=this.calculatePosition(e),this.dimension=this.getDimension(e)}resetPosition(){this.position=this.defaultPosition,this.dimension=this.getDimension(this.defaultAnchor),this.defaultAnchor.classList.add(e.activeClass)}setAnchorEvents(t){t.addEventListener("mouseenter",()=>{this.updatePosition(t),this.defaultAnchor.classList.remove(e.activeClass),t.classList.add(e.activeClass)}),t.addEventListener("mouseleave",()=>{t.classList.remove(e.activeClass)}),t.addEventListener("click",()=>{this.defaultAnchor=t,this.updatePosition(t)})}init(){this.element||this.createBubble(),this.resetPosition(),this.anchors.forEach(e=>this.setAnchorEvents(e)),this.relative.addEventListener("mouseleave",()=>this.resetPosition()),window.addEventListener("resize",()=>this.resetPosition())}}let t=document.querySelector("form"),i=document.querySelector("button"),a=document.querySelector("[card-deck]"),s=document.querySelector("[card-template]"),r=document.querySelector("[bubble-container]"),l=document.querySelector("[result-popup]"),n=document.querySelector("[result]"),o=()=>{let{name:e,multiplier:i}=t;d.addCard(e.value,i.value),e.value=""},d=new class{static placeholderCards=[{name:"Tom",multiplier:1},{name:"Jerry",multiplier:2}];constructor(e,t,i){this.cards=[],this.id=0,this.template=e.content,this.container=t,this.button=i,this.loadDefaultCards()}removeCard(e){let t=+e.dataset.id;this.cards=this.cards.filter(e=>e.id!==t),this.updateRaffleButtonState(),e.remove()}updateCard(e){let t=+e.dataset.id,i=e.querySelector("[card-name]").value,a=e.querySelector("[card-multiplier]").value,s=this.cards.find(e=>e.id===t);s.multiplier=+a,s.name=i,s.name||this.removeCard(e)}createCard({id:e,name:t,multiplier:i}){let a=this.template.cloneNode(!0),s=a.querySelector("[card]"),r=a.querySelector("[delete-button]"),l=a.querySelector("[card-name]"),n=a.querySelector("[card-multiplier]");return s.dataset.id=e,l.value=t,n.value=i,r.addEventListener("click",()=>this.removeCard(s)),l.addEventListener("change",()=>this.updateCard(s)),n.addEventListener("change",()=>this.updateCard(s)),a}addCard(e,t){let i={id:this.id++,name:e.trim(),multiplier:+t};if(!i.name)return;let a=this.createCard(i);this.cards.push(i),this.updateRaffleButtonState(),this.container.append(a)}getRandomCard(){let e=this.cards.flatMap(e=>Array(e.multiplier).fill(e)),t=e[Math.floor(Math.random()*e.length)];return this.saveToLocalStorage(),t}updateRaffleButtonState(){this.button.disabled=this.cards.length<2}saveToLocalStorage(){localStorage.setItem("raffle-cards",JSON.stringify(this.cards))}loadDefaultCards(){let e=localStorage.getItem("raffle-cards");(e?JSON.parse(e):this.placeholderCards).forEach(e=>{this.addCard(e.name,e.multiplier)})}}(s,a,i);new e(r),i.addEventListener("click",()=>{n.textContent=d.getRandomCard().name,l.hidden=!1}),t.addEventListener("submit",e=>{e.preventDefault(),o()}),l.addEventListener("click",()=>{l.hidden=!0})}();