import { profile, localize } from '../resume/data/base.mjs';

const chapters = [
  {id:'logic', title:['Thinking in Logic','Pensar em lógica'], intro:['Start with rules, choices and program state.','Começar pelas regras, escolhas e estado do programa.'], projects:['penguin']},
  {id:'interfaces', title:['Building for Users','Construir para os utilizadores'], intro:['Explore how interfaces become accessible, responsive experiences.','Explorar como as interfaces se tornam experiências acessíveis e responsivas.'], projects:['portfolio']},
  {id:'interaction', title:['Making Applications Interactive','Criar aplicações interativas'], intro:['Compare browser-based task storage with authenticated synchronisation.','Comparar armazenamento de tarefas no navegador com sincronização autenticada.'], projects:['tasks','todo']},
  {id:'backend', title:['Behind the Interface','Para além da interface'], intro:['Discover persistence, APIs, authorisation and automated validation.','Descobrir persistência, APIs, autorização e validação automatizada.'], projects:['devflow']},
  {id:'opus', title:['Connecting Everything','Ligar todas as peças'], intro:['Music and software meet in a complete catalogue application.','A música e o software encontram-se numa aplicação de catálogo completa.'], projects:['opus']},
  {id:'next', title:['The Next Chapter','O próximo capítulo'], intro:['Further training, curricular internship and new projects. This chapter is still in progress.','Formação adicional, estágio curricular e novos projetos. Este capítulo está em desenvolvimento.'], projects:[]}
];

const root = document.documentElement;
const list = document.querySelector('#chapter-list');
const map = document.querySelector('#journey-map');
const nav = document.querySelector('#chapter-nav');
let observer;
let activeChapter = 'logic';
const exampleTasks = [true,false,false];
const language = document.querySelector('#language');
const theme = document.querySelector('#theme');
const storage = {
  get(key){try{return localStorage.getItem(key)}catch{return null}},
  set(key,value){try{localStorage.setItem(key,value)}catch{}}
};
let lang = storage.get('portfolio-language') === 'pt-PT' ? 'pt-PT' : 'en';
let dark = storage.get('resume-theme') ? storage.get('resume-theme') === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const tr = (en,pt) => lang === 'pt-PT' ? pt : en;
const el = (tag,text,cls) => {const node=document.createElement(tag);if(text!=null)node.textContent=text;if(cls)node.className=cls;return node};
const link = (label,href) => {const a=el('a',label);a.href=href;return a};

function projectCard(id){
  const p=profile.projects[id];
  const article=el('article',null,'project');
  const copy=el('div');
  copy.append(el('p',localize(p.status,lang),'status'),el('h4',p.name),el('p',localize(p.short,lang)));
  const tags=el('ul',null,'tags');
  tags.setAttribute('aria-label',tr('Technologies','Tecnologias'));
  for(const tech of p.stack)tags.append(el('li',tech));
  copy.append(tags);
  if(p.features?.length){
    const details=el('details');
    details.dataset.project=id;
    details.append(el('summary',tr('Technical details','Detalhes técnicos')));
    if(p.contribution)details.append(el('p',localize(p.contribution,lang)));
    const features=el('ul');
    for(const feature of p.features)features.append(el('li',localize(feature,lang)));
    details.append(features);
    copy.append(details);
  }
  const links=el('div',null,'links');
  links.append(link(tr('Source code','Código-fonte'),p.repo));
  if(id==='opus')links.append(link(tr('Case study','Estudo de caso'),'../projects/opus/'));
  if(p.demo)links.append(link(id==='portfolio'?tr('Portfolio','Portefólio'):p.demoLabel?localize(p.demoLabel,lang):tr('Live demo','Demo online'),id==='portfolio'?'../home/':p.demo));
  if(p.review)links.append(link(tr('Pull request','Pull request'),p.review));
  copy.append(links);
  article.append(copy);
  if(p.image){
    article.classList.add('has-image');
    const figure=el('figure');
    const image=el('img');
    image.src='../'+p.image;
    image.alt=p.alt;
    image.loading='lazy';
    image.decoding='async';
    figure.append(image,el('figcaption',tr('Project screenshot','Captura do projeto')));
    article.append(figure);
  }else if(id==='opus'){
    const figure=el('figure');
    const image=el('img');
    image.src='../assets/opus-mark.svg';
    image.alt='OPUS';
    image.loading='lazy';
    figure.append(image,el('figcaption',tr('Project emblem · not a screenshot','Símbolo do projeto · não é uma captura de ecrã')));
    figure.style.maxWidth='160px';
    article.append(figure);
    article.classList.add('has-image');
  }
  return article;
}

function taskExhibit(){
  const exhibit=el('section',null,'exhibit');
  exhibit.append(el('p',tr('INTERACTIVE EXHIBIT','DEMONSTRAÇÃO INTERATIVA'),'eyebrow'),el('h4',tr('How state changes the interface','Como o estado altera a interface')),el('p',tr('Try checking a task. This simplified example demonstrates the same state and event-handling concepts, not the original app.','Experimenta concluir uma tarefa. Este exemplo simplificado demonstra os conceitos de estado e gestão de eventos, não a aplicação original.')));
  const progress=el('progress');
  progress.max=exampleTasks.length;
  progress.setAttribute('aria-label',tr('Task completion','Tarefas concluídas'));
  const status=el('p');
  status.setAttribute('role','status');
  const update=()=>{
    const count=exampleTasks.filter(Boolean).length;
    progress.value=count;
    status.textContent=tr(count+' of 3 tasks complete',count+' de 3 tarefas concluídas');
  };
  exhibit.append(progress,status);
  [['Explore the journey','Explorar o percurso'],['Read a case study','Ler um estudo de caso'],['Inspect the source code','Consultar o código-fonte']].forEach((labels,i)=>{
    const label=el('label');
    const input=el('input');
    input.type='checkbox';
    input.checked=exampleTasks[i];
    input.addEventListener('change',()=>{exampleTasks[i]=input.checked;update()});
    label.append(input,document.createTextNode(tr(...labels)));
    exhibit.append(label);
  });
  update();
  return exhibit;
}
function markCurrent(id){
  activeChapter=id;
  for(const a of nav.querySelectorAll('a')){
    if(a.hash==='#'+id)a.setAttribute('aria-current','location');
    else a.removeAttribute('aria-current');
  }
}
function renderNavigation(){
  map.replaceChildren();
  nav.replaceChildren();
  map.setAttribute('aria-label',tr('Journey map','Mapa do percurso'));
  nav.setAttribute('aria-label',tr('Chapter navigation','Navegação pelos capítulos'));
  chapters.forEach((chapter,i)=>{
    const a=link('', '#'+chapter.id);
    a.className='map-link';
    a.append(el('span',String(i+1).padStart(2,'0'),'number'),el('span',tr(...chapter.title)));
    map.append(a);
    const n=link(String(i+1).padStart(2,'0')+' · '+tr(...chapter.title),'#'+chapter.id);
    n.addEventListener('click',()=>markCurrent(chapter.id));
    nav.append(n);
  });
  map.hidden=false;
  nav.hidden=false;
  markCurrent(activeChapter);
}
function render(){
  const expanded=new Set([...list.querySelectorAll('details[open]')].map(d=>d.dataset.project));
  root.lang=lang==='en'?'en':lang;
  document.title=tr('Learning by Building | Torres Almeida Digital','Aprender a construir | Torres Almeida Digital');
  for(const node of document.querySelectorAll('[data-en][data-pt]'))node.textContent=tr(node.dataset.en,node.dataset.pt);
  language.textContent=tr('PT','EN');
  language.setAttribute('aria-label',tr('Switch to Portuguese','Mudar para inglês'));
  theme.setAttribute('aria-label',tr('Toggle dark theme','Alternar tema escuro'));
  renderNavigation();
  const fragment=document.createDocumentFragment();
  chapters.forEach((chapter,i)=>{
    const section=el('section',null,'chapter');
    section.id=chapter.id;
    const title=el('h3',tr(...chapter.title));
    title.id=chapter.id+'-title';
    section.setAttribute('aria-labelledby',title.id);
    section.append(el('span',String(i+1).padStart(2,'0'),'number'));
    const body=el('div');
    body.append(title,el('p',tr(...chapter.intro),'chapter-intro'));
    if(chapter.id==='interaction')body.append(taskExhibit());
    for(const id of chapter.projects)body.append(projectCard(id));
    section.append(body);
    fragment.append(section);
  });
  list.replaceChildren(fragment);
  for(const detail of list.querySelectorAll('details'))detail.open=expanded.has(detail.dataset.project);
  observer?.disconnect();
  if('IntersectionObserver' in window){
    observer=new IntersectionObserver(entries=>{
      const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(current)markCurrent(current.target.id);
    },{rootMargin:'-12% 0px -65% 0px'});
    for(const section of list.querySelectorAll('.chapter'))observer.observe(section);
  }
}
function applyTheme(){root.dataset.theme=dark?'dark':'light';theme.setAttribute('aria-pressed',String(dark))}
language.addEventListener('click',()=>{lang=lang==='en'?'pt-PT':'en';storage.set('portfolio-language',lang==='en'?'en-US':lang);render()});
theme.addEventListener('click',()=>{dark=!dark;storage.set('resume-theme',dark?'dark':'light');applyTheme()});
render();
applyTheme();
