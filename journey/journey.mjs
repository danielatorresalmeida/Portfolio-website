import { profile, localize } from '../resume/data/base.mjs';
import { renderGallery } from './gallery.mjs';

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
let fishingScore = 0;
let fishingTurns = 5;
let apiRole = 'member';
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
  const article=el('article',null,'project project-'+id);
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
    const preview=link('',image.getAttribute('src'));
    preview.className='image-preview';
    preview.setAttribute('aria-label',tr('View full screenshot: ','Ver captura completa: ')+p.name);
    preview.target='_blank';
    preview.rel='noopener';
    preview.append(image);
    figure.append(preview,el('figcaption',tr('Project screenshot · open to enlarge','Captura do projeto · abrir para ampliar')));
    article.append(figure);
  }else if(id==='opus'){
    const figure=el('figure');
    const image=el('img');
    image.src='../assets/opus-mark.svg';
    image.alt='OPUS';
    image.loading='lazy';
    figure.append(image,el('figcaption',tr('Project emblem · not a screenshot','Símbolo do projeto · não é uma captura de ecrã')));
    figure.classList.add('opus-emblem');
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
const learningNotes = {
  logic:['Before building an interface, a program needs rules that keep its state consistent. The C project makes those rules explicit through validated input and scoring.','Antes de construir uma interface, um programa precisa de regras que mantenham o estado consistente. O projeto em C torna essas regras explícitas através da validação de input e da pontuação.'],
  interfaces:['A working application also needs to be usable. The portfolio adds responsive layout, keyboard navigation and automated quality checks to that foundation.','Uma aplicação funcional também precisa de ser fácil de utilizar. O portefólio acrescenta layouts responsivos, navegação por teclado e verificações automatizadas de qualidade a essa base.'],
  interaction:['The next layer is behaviour: keeping the interface in sync with data, whether stored in the browser or synchronised through an authenticated service.','A camada seguinte é o comportamento: manter a interface sincronizada com os dados, quer sejam guardados no navegador, quer através de um serviço autenticado.'],
  backend:['An interface is only part of the system. The server must decide whether requests are valid, authorised and safe to persist.','Uma interface é apenas parte do sistema. O servidor precisa de decidir se os pedidos são válidos, autorizados e seguros para guardar.'],
  opus:['OPUS brings these ideas together: a musical catalogue, a relational database, authentication, controlled imports and a real domain of knowledge from music education.','O OPUS reúne estas ideias: um catálogo musical, uma base de dados relacional, autenticação, importações controladas e conhecimento adquirido no ensino da música.']
};
function exhibitShell(title,description){
  const box=el('section',null,'exhibit');
  box.append(el('p',tr('INTERACTIVE EXHIBIT','DEMONSTRAÇÃO INTERATIVA'),'eyebrow'),el('h4',tr(...title)),el('p',tr(...description)));
  return box;
}
function logicExhibit(){
  const box=exhibitShell(['Rules, choices and state','Regras, escolhas e estado'],['A deterministic mini-game inspired by Penguin Fishing Game. This is an illustrative JavaScript exercise, not a port of the C source.','Um minijogo determinístico inspirado no Penguin Fishing Game. É um exercício ilustrativo em JavaScript, não uma adaptação do código C original.']);
  const controls=el('div',null,'exhibit-actions');
  const cast=el('button',tr('Cast the line','Lançar a linha'));
  const reset=el('button',tr('Reset','Reiniciar'));
  cast.type=reset.type='button';
  const score=el('p',null,'exhibit-output');
  score.setAttribute('role','status');
  const code=el('pre',null,'state-code');
  const update=()=>{
    cast.disabled=fishingTurns===0;
    score.textContent=tr('Score: '+fishingScore+' · Turns remaining: '+fishingTurns,'Pontuação: '+fishingScore+' · Jogadas restantes: '+fishingTurns);
    code.textContent=JSON.stringify({score:fishingScore,turns:fishingTurns,gameOver:fishingTurns===0},null,2);
  };
  cast.addEventListener('click',()=>{if(fishingTurns>0){fishingTurns--;fishingScore+=10;update()}});
  reset.addEventListener('click',()=>{fishingScore=0;fishingTurns=5;update()});
  controls.append(cast,reset);
  box.append(controls,score,code);
  update();
  return box;
}
function apiExhibit(){
  const box=exhibitShell(['Follow an API request','Acompanhar um pedido à API'],['Choose a role to see an illustrative authorisation flow. This is a local simulation, not a live DevFlow Hub endpoint or its exact permission policy.','Escolhe um perfil para observar um fluxo ilustrativo de autorização. É uma simulação local, não um endpoint ativo do DevFlow Hub nem a sua política exata de permissões.']);
  const controls=el('div',null,'exhibit-actions');
  controls.setAttribute('role','group');
  controls.setAttribute('aria-label',tr('Example role','Perfil de exemplo'));
  const steps=el('ol',null,'api-flow');
  const output=el('pre',null,'state-code');
  const status=el('p',null,'exhibit-output');
  status.setAttribute('role','status');
  const update=()=>{
    const allowed=apiRole==='member';
    for(const b of controls.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.role===apiRole));
    steps.replaceChildren(...[
      tr('Client · GET /projects/42','Cliente · GET /projects/42'),
      tr('API · validate identity','API · validar identidade'),
      allowed?tr('Authorisation · allowed','Autorização · permitida'):tr('Authorisation · denied','Autorização · recusada'),
      allowed?tr('Database · read project','Base de dados · consultar projeto'):tr('Database · not queried','Base de dados · sem consulta')
    ].map(s=>el('li',s)));
    status.textContent=allowed?'200 OK':'403 Forbidden';
    output.textContent=JSON.stringify(allowed?{id:42,name:'Example project'}:{error:'Forbidden'},null,2);
  };
  for(const [role,labels] of [['member',['Project member','Membro do projeto']],['visitor',['Non-member','Sem acesso ao projeto']]]){
    const b=el('button',tr(...labels));
    b.type='button';b.dataset.role=role;
    b.addEventListener('click',()=>{apiRole=role;update()});
    controls.append(b);
  }
  box.append(controls,steps,status,output);
  update();
  return box;
}
function nextChapter(){
  const box=el('div',null,'next-panel');
  box.append(el('h4',tr('What comes next','O que se segue')),el('p',localize(profile.training.expected,lang)),el('p',tr('Curricular internship: 1 March – 20 May 2027 · Full-time availability from 21 May 2027.','Estágio curricular: 1 de março a 20 de maio de 2027 · Disponibilidade a tempo inteiro a partir de 21 de maio de 2027.')));
  const actions=el('div',null,'links');
  actions.append(link(tr('View CV','Consultar CV'),'../resume-site-only/'),link(tr('Contact','Contacto'),'../home/#contact'));
  box.append(actions);
  return box;
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
  renderGallery({chapters,profile,lang,el,link,tr});
  document.querySelector('#spatial-gallery').hidden=false;
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
    if(learningNotes[chapter.id])body.append(el('p',tr(...learningNotes[chapter.id]),'learning-note'));
    for(const id of chapter.projects)body.append(projectCard(id));
    const exhibits={logic:logicExhibit,interaction:taskExhibit,backend:apiExhibit};
    if(exhibits[chapter.id]){
      const exhibit=exhibits[chapter.id]();
      exhibit.id=chapter.id+'-exhibit';
      const heading=exhibit.querySelector('h4');
      heading.id=exhibit.id+'-title';
      exhibit.setAttribute('aria-labelledby',heading.id);
      body.append(exhibit);
    }
    if(chapter.id==='next')body.append(nextChapter());
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
