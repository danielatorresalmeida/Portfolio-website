// CSS 3D prototype: no WebGL, remote assets or mandatory motion.
let selected = 0;
export function renderGallery({chapters,profile,lang,el,link,tr}){
  const host=document.querySelector('#spatial-gallery');
  if(!host)return;
  const wasOpen=host.open;
  host.replaceChildren();
  const summary=el('summary',tr('Enter the spatial gallery','Entrar na galeria espacial'));
  const intro=el('p',tr('Explore one installation at a time. Use the arrows or select any chapter. You can return to the full reading view at any moment.','Explora uma instalação de cada vez. Utiliza as setas ou seleciona um capítulo. Podes voltar à leitura completa a qualquer momento.'));
  const stage=el('div',null,'gallery-stage');
  const controls=el('div',null,'gallery-controls');
  const prev=el('button',tr('← Previous','← Anterior'));
  const next=el('button',tr('Next →','Seguinte →'));
  prev.type=next.type='button';
  const count=el('p',null,'gallery-count');
  count.setAttribute('role','status');
  controls.append(prev,count,next);
  const selector=el('div',null,'gallery-selector');
  selector.setAttribute('role','group');
  selector.setAttribute('aria-label',tr('Select a chapter','Selecionar um capítulo'));
  const caption=el('div',null,'gallery-caption');
  const symbols=['01 / LOGIC','02 / INTERFACE','03 / STATE','04 / API','05 / OPUS','06 / NEXT'];
  const previews={logic:'penguin',interfaces:'portfolio',interaction:'todo',backend:'devflow',opus:'opus'};
  function paint(){
    stage.replaceChildren();
    for(let offset=-1;offset<=1;offset++){
      const index=selected+offset;
      if(index<0||index>=chapters.length)continue;
      const chapter=chapters[index];
      const panel=el('div',null,'gallery-panel gallery-panel-'+chapter.id);
      panel.dataset.position=offset===0?'center':offset<0?'left':'right';
      panel.setAttribute('aria-hidden','true');
      panel.append(el('span',symbols[index],'gallery-symbol'));
      const p=profile.projects[previews[chapter.id]];
      const src=chapter.id==='opus'?'../assets/opus-mark.svg':p?.image?'../'+p.image:null;
      if(src){
        const image=el('img');
        image.src=src;image.alt='';image.decoding='async';image.loading='lazy';
        panel.append(image);
      }else{
        panel.append(el('div','+','gallery-plus'));
      }
      panel.append(el('strong',tr(...chapter.title)));
      stage.append(panel);
    }
    const chapter=chapters[selected];
    count.textContent=tr('Chapter '+(selected+1)+' of '+chapters.length,'Capítulo '+(selected+1)+' de '+chapters.length);
    prev.disabled=selected===0;next.disabled=selected===chapters.length-1;
    for(const b of selector.children)b.setAttribute('aria-pressed',String(Number(b.dataset.index)===selected));
    caption.replaceChildren(el('h3',tr(...chapter.title)),el('p',tr(...chapter.intro)));
    const open=link(tr('Explore this chapter ↓','Explorar este capítulo ↓'),'#'+chapter.id);
    open.className='primary';
    open.addEventListener('click',()=>{host.open=false;requestAnimationFrame(()=>{const title=document.getElementById(chapter.id+'-title');if(title){title.tabIndex=-1;title.focus({preventScroll:true});title.closest('section').scrollIntoView({block:'start'})}})});
    caption.append(open);
  }
  function choose(index){selected=Math.max(0,Math.min(chapters.length-1,index));paint()}
  chapters.forEach((chapter,i)=>{
    const b=el('button',String(i+1).padStart(2,'0'));
    b.type='button';b.dataset.index=i;b.setAttribute('aria-label',tr(...chapter.title));
    b.addEventListener('click',()=>choose(i));selector.append(b);
  });
  prev.addEventListener('click',()=>choose(selected-1));next.addEventListener('click',()=>choose(selected+1));
  // Native buttons are the keyboard and touch controls; no intercepted page scrolling.
  host.append(summary,intro,stage,controls,selector,caption);
  host.open=wasOpen;
  paint();
}
