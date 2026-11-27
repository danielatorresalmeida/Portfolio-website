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
const language = document.querySelector('#language');
const theme = document.querySelector('#theme');
const storage = {
  get(key){try{return localStorage.getItem(key)}catch{return null}},
  set(key,value){try{localStorage.setItem(key,value)}catch{}}
};
let lang = storage.get('journey-language') === 'pt-PT' ? 'pt-PT' : 'en';
let dark = storage.get('journey-theme') ? storage.get('journey-theme') === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const tr = (en,pt) => lang === 'pt-PT' ? pt : en;
const el = (tag,text,cls) => {const node=document.createElement(tag);if(text!=null)node.textContent=text;if(cls)node.className=cls;return node};
const link = (label,href) => {const a=el('a',label);a.href=href;return a};

function projectCard(id){
  const p=profile.projects[id];
  const article=el('article',null,'project');
  article.append(el('p',localize(p.status,lang),'status'),el('h4',p.name),el('p',localize(p.short,lang)));
  const tags=el('ul',null,'tags');
  tags.setAttribute('aria-label',tr('Technologies','Tecnologias'));
  for(const tech of p.stack)tags.append(el('li',tech));
  article.append(tags);
  if(p.features?.length){
    const details=el('details');
    details.dataset.project=id;
    details.append(el('summary',tr('Technical details','Detalhes técnicos')));
    if(p.contribution)details.append(el('p',localize(p.contribution,lang)));
    const features=el('ul');
    for(const feature of p.features)features.append(el('li',localize(feature,lang)));
    details.append(features);
    article.append(details);
  }
  const links=el('div',null,'links');
  links.append(link(tr('Source code','Código-fonte'),p.repo));
  if(id==='opus')links.append(link(tr('Case study','Estudo de caso'),'../projects/opus/'));
  if(p.demo)links.append(link(id==='portfolio'?tr('Portfolio','Portefólio'):p.demoLabel?localize(p.demoLabel,lang):tr('Live demo','Demo online'),id==='portfolio'?'../home/':p.demo));
  if(p.review)links.append(link(tr('Pull request','Pull request'),p.review));
  article.append(links);
  return article;
}

function render(){
  const expanded=new Set([...list.querySelectorAll('details[open]')].map(d=>d.dataset.project));
  root.lang=lang==='en'?'en':lang;
  document.title=tr('Learning by Building | Torres Almeida Digital','Aprender a construir | Torres Almeida Digital');
  for(const node of document.querySelectorAll('[data-en][data-pt]'))node.textContent=tr(node.dataset.en,node.dataset.pt);
  language.textContent=tr('PT','EN');
  language.setAttribute('aria-label',tr('Switch to Portuguese','Mudar para inglês'));
  theme.setAttribute('aria-label',tr('Toggle dark theme','Alternar tema escuro'));
  const fragment=document.createDocumentFragment();
  chapters.forEach((chapter,i)=>{
    const section=el('section',null,'chapter');
    section.id=chapter.id;
    const title=el('h3',tr(...chapter.title));
    title.id=chapter.id+'-title';
    section.setAttribute('aria-labelledby',title.id);
    section.append(el('span',String(i+1).padStart(2,'0'),'number'));
    const body=el('div');
    body.append(title,el('p',tr(...chapter.intro)));
    for(const id of chapter.projects)body.append(projectCard(id));
    section.append(body);
    fragment.append(section);
  });
  list.replaceChildren(fragment);
  for(const detail of list.querySelectorAll('details'))detail.open=expanded.has(detail.dataset.project);
}
function applyTheme(){root.dataset.theme=dark?'dark':'light';theme.setAttribute('aria-pressed',String(dark))}
language.addEventListener('click',()=>{lang=lang==='en'?'pt-PT':'en';storage.set('journey-language',lang);render()});
theme.addEventListener('click',()=>{dark=!dark;storage.set('journey-theme',dark?'dark':'light');applyTheme()});
render();
applyTheme();
