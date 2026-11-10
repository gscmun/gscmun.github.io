
// GSC MUN script. Things you will probably edit are marked EDIT.
(function(){
// Shortcut: $('id') = document.getElementById('id')
var $=function(i){return document.getElementById(i)};
// ---- Word strip under the hero (EDIT the words in this list) ----
var wd=['Diplomacy','Dialogue','Peace','Resolution','Consensus','Leadership'],h='';for(var k=0;k<4;k++)wd.forEach(function(w){h+=w+'<b>◆</b>'});$('m1').innerHTML=h;
var ct='';for(k=0;k<24;k++)ct+='Coming Soon<b>◆</b>';document.querySelectorAll('.cs').forEach(function(e){e.innerHTML=ct+ct});
// ---- Sponsors: EDIT here. Example: var SPONSORS=[{name:'Acme',logo:'assets/acme.png'}]; empty = placeholder slots ----
var SPONSORS=[]; /* add {name:'Acme',logo:'data:image/...'} */
var sl=SPONSORS.length?SPONSORS.map(function(s){return'<div class="sl"><img alt="'+s.name+'" src="'+s.logo+'"></div>'}):['','','','','',''].map(function(){return'<div class="sl ph">Sponsor slot</div>'});
var hf='';while(hf.split('class="sl').length<9)hf+=sl.join('');$('st').innerHTML=hf+hf;
// About paragraph: each word is wrapped so it lights up as you scroll
var big=$('big'),ws=big.textContent.split(' ');big.innerHTML=ws.map(function(w){return'<span>'+w+'</span>'}).join(' ');var sp=big.children;
// ---- COMMITTEES (EDIT): [short name, full name, description, gradient colours, unused icon] ----
// Committee logos (files live in the assets/ folder)
var LG={UNCSW:'assets/uncsw.png',UNSC:'assets/unsc.png',PNA:'assets/pna.png',UNHRC:'assets/unhrc.png',UNODC:'assets/unodc.png'};
var C=[['UNODC','United Nations Office on Drugs and Crime','Confronting drugs, organised crime, corruption and terrorism through international cooperation.','#101a66,#4b6fd8','<path d="M32 6l20 12v28L32 58 12 46V18z"/><circle cx="32" cy="32" r="9"/><path d="M20 44l24-24"/>'],
['UNHRC','United Nations Human Rights Council','Dignity, justice and equality, argued with evidence and conviction.','#2a2a8f,#7b63e0','<path d="M32 8v44M18 16h28M22 52h20"/><path d="M18 16l-9 18h18zM46 16l-9 18h18z"/>'],
['UNCSW','Commission on the Status of Women','Advancing gender equality and the empowerment of women and girls worldwide.','#3a2a8c,#a08af0','<circle cx="32" cy="24" r="12"/><path d="M32 36v20M23 46h18"/>'],
['UNSC','United Nations Security Council','Peace and security at the highest level: mandates, sanctions and the limits of consensus.','#0a1050,#3a2fa0','<path d="M32 6l22 8v16c0 14-9 24-22 28C19 54 10 44 10 30V14z"/><path d="M32 20l4 8h8l-6 6 2 9-8-5-8 5 2-9-6-6h8z"/>'],
['PNA','Pakistan National Assembly','Legislative debate in the lower house of Parliament: bills, motions and the business of governing.','#1c0f58,#7a4fd0','<path d="M8 24L32 8l24 16z"/><path d="M16 28v20M27 28v20M37 28v20M48 28v20M10 52h44"/>']];
// Build one panel per committee (logo, name, description)
var pns=$('pns');C.forEach(function(c,i){var d=document.createElement('div');d.className='pn';d.style.background='linear-gradient(150deg,'+c[3]+')';
d.innerHTML='<span class="lb"><b>'+c[0]+'</b></span><div class="pc"><div class="ic"><img alt="" src="'+LG[c[0]]+'"></div><small>0'+(i+1)+' / 0'+C.length+'</small><h3>'+c[0]+'</h3><h4>'+c[1]+'</h4><p>'+c[2]+'</p><span class="pill">Agenda to be announced</span></div>';
d.onclick=function(){var s=$('committees');scrollTo({top:s.offsetTop+i/(C.length-1)*(s.offsetHeight-innerHeight),behavior:'smooth'})};var w=document.createElement('img');w.className='wm';w.alt='';w.src=LG[c[0]];d.appendChild(w);pns.appendChild(d)});
var pn=pns.children,tg=0,cur=0,b1=document.querySelector('.b1'),b2=document.querySelector('.b2');
document.querySelectorAll('h2').forEach(function(h){h.innerHTML=h.textContent.split(' ').map(function(w,i){return'<span class="hw"><i style="transition-delay:'+i*70+'ms">'+w+'</i></span>'}).join(' ')});
// Runs on scroll: progress bar, about-text reveal, committee slider position, timeline line, blob parallax
function upd(){var st=document.documentElement.scrollTop||document.body.scrollTop,H=innerHeight;
$('bar').style.width=(st/(document.documentElement.scrollHeight-H)*100)+'%';
var r=big.getBoundingClientRect(),p=Math.min(1,Math.max(0,(H*.85-r.top)/(H*.55)));for(var i=0;i<sp.length;i++)sp[i].classList.toggle('on',i<p*sp.length+1&&p>0);
var s=$('committees').getBoundingClientRect();tg=Math.min(1,Math.max(0,-s.top/(s.height-H)))*(C.length-1);
var t=$('tl').getBoundingClientRect();$('fl').style.height=Math.min(t.height-12,Math.max(0,H*.6-t.top))+'px';
b1.style.translate='0 '+st*.1+'px';b2.style.translate='0 '+(-st*.06)+'px'}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
// Animation loop: smoothly grows the active committee panel and fades its content
(function lp(){cur+=(tg-cur)*.08;for(var i=0;i<pn.length;i++){var k=Math.max(0,1-Math.abs(i-cur)),e=k*k*(3-2*k),c=pn[i].children;pn[i].style.flexGrow=(1+4.4*e).toFixed(3);c[1].style.opacity=Math.max(0,(e-.4)/.6);c[1].style.transform='translateY('+(1-e)*26+'px)';c[0].style.opacity=Math.max(0,1-e*2.2);c[2].style.opacity=(.16*e).toFixed(3);c[1].querySelector('.ic').style.transform='scale('+(.7+.3*e)+') rotate('+(1-e)*-25+'deg)'}
$('pi').style.width=(cur/(C.length-1)*100)+'%';var n=Math.round(cur);$('ct').textContent='0'+(n+1)+' / 0'+C.length;requestAnimationFrame(lp)})();
document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.16)+'px,'+((e.clientY-r.top-r.height/2)*.28-2)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
document.addEventListener('pointermove',function(e){var k=e.target.closest&&e.target.closest('.ty');if(k){var r=k.getBoundingClientRect();k.style.setProperty('--mx',e.clientX-r.left+'px');k.style.setProperty('--my',e.clientY-r.top+'px')}});
// ---- Fade-in on scroll + animated stat counters (numbers come from data-n in index.html) ----
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(function(n){var t=+n.dataset.n,s=n.dataset.s||'',v=0,id=setInterval(function(){v+=Math.max(1,t/40);if(v>=t){v=t;clearInterval(id)}n.textContent=Math.round(v)+s},30)});io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rev').forEach(function(e){io.observe(e)});
// ---- Mouse effects: cursor glow and hero logo tilt ----
var gl=$('glow'),lg=$('lg');addEventListener('pointermove',function(e){gl.style.left=e.clientX+'px';gl.style.top=e.clientY+'px';if(innerWidth>860){var x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;lg.style.transform='translate('+x*14+'px,'+y*10+'px) rotateY('+x*6+'deg)'}});
// ---- REGISTRATION FORMS (EDIT): each category lists its fields: [id, label, type, options] ----
var F={pd:['Private Delegate','Join solo. We assign your country and committee.',[['name','Full name'],['email','Email','email'],['phone','Phone / WhatsApp'],['inst','Institution'],['exp','MUN experience','s',['First-timer','1 to 3 conferences','4+ conferences']],['c1','First committee preference','s',C.map(function(c){return c[0]})],['c2','Second committee preference','s',C.map(function(c){return c[0]}).reverse()],['grade','Grade / year (optional)'],['note','Anything else? (optional)','t']]],
dl:['Delegation','Register a group from your school or institution.',[['inst','Institution name'],['name','Head delegate'],['email','Email','email'],['phone','Phone / WhatsApp'],['size','Number of delegates','number'],['adv','Faculty advisor (optional)'],['note','Country / committee preferences (optional)','t']]],
ob:['Observer','Attend, watch the debate and take in the experience.',[['name','Full name'],['email','Email','email'],['phone','Phone / WhatsApp'],['inst','Institution (optional)'],['note','Why would you like to observe? (optional)','t']]]};
var ty=$('types'),pan=$('pan'),ks=Object.keys(F);
ks.forEach(function(k,i){var b=document.createElement('button');b.className='ty';b.innerHTML='<div class="no">0'+(i+1)+'</div><h3>'+F[k][0]+'</h3><p>'+F[k][1]+'</p>';b.onclick=function(){document.querySelectorAll('.ty').forEach(function(t){t.classList.remove('sel')});b.classList.add('sel');form(k)};ty.appendChild(b)});
// Builds the form for the chosen category; submissions are saved in the browser (localStorage) only.
// To receive real registrations, send the data `d` to a backend or Google Form inside f.onsubmit.
function form(k){var f=document.createElement('form'),h='';F[k][2].forEach(function(x){var req=!/optional/.test(x[1])?' required':'',ty=x[2],o='';
if(ty==='s'){o='<select name="'+x[0]+'">'+x[3].map(function(v){return'<option>'+v+'</option>'}).join('')+'</select>'}else if(ty==='t'){o='<textarea name="'+x[0]+'" rows="3"></textarea>'}else{o='<input name="'+x[0]+'" type="'+(ty||'text')+'"'+(ty==='number'?' min="2"':'')+req+'>'}
h+='<label'+(ty==='t'?' class="full"':'')+'>'+x[1]+o+'</label>'});
f.innerHTML=h+'<button class="btn full" style="justify-content:center"><span>Submit registration</span></button>';
f.onsubmit=function(e){e.preventDefault();var d={type:F[k][0],time:new Date().toISOString()};new FormData(f).forEach(function(v,n){d[n]=v});var ref='GSC-'+F[k][0].slice(0,3).toUpperCase()+'-'+Math.random().toString(36).slice(2,7).toUpperCase();d.ref=ref;
// Saves locally and shows the reference number
try{var a=JSON.parse(localStorage.getItem('gscmun_regs')||'[]');a.push(d);localStorage.setItem('gscmun_regs',JSON.stringify(a))}catch(err){}
pan.innerHTML='<div class="ok"><svg class="ck" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><path d="M24 41l12 12 21-24"/></svg><h3 style="font-size:28px">Registration received</h3><p>Your reference number</p><div class="ref">'+ref+'</div><p style="font-size:14px">Keep this safe. The organizing team will contact you using the details provided.</p></div>'};
pan.innerHTML='';pan.appendChild(f)}
})();
