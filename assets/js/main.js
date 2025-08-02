async function loadPartials(){
  const header = document.getElementById('site-header');
  if(header){
    const res = await fetch('/partials/header.html');
    header.innerHTML = await res.text();
  }
  const footer = document.getElementById('site-footer');
  if(footer){
    const res = await fetch('/partials/footer.html');
    footer.innerHTML = await res.text();
  }
  document.getElementById('year')?.textContent = new Date().getFullYear();
  initTheme();
  initScrollTop();
}
function initTheme(){
  const toggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  if(saved==='dark' || (!saved && prefersDark)){
    document.documentElement.classList.add('dark');
  }
  toggle?.addEventListener('click',()=>{
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',document.documentElement.classList.contains('dark')?'dark':'light');
  });
}
function initScrollTop(){
  const btn = document.getElementById('toTop');
  if(!btn) return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY>300) btn.classList.add('show'); else btn.classList.remove('show');
  });
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
document.addEventListener('DOMContentLoaded',loadPartials);
