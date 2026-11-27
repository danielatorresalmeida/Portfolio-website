// Opt-in WebGL exhibition. No server, credentials or project API calls.
const THREE_URL='https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
export async function createRoom({mount,chapters,profile,tr,onSelect,initialIndex=0}){
  const T=await import(THREE_URL);
  const renderer=new T.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.outputColorSpace=T.SRGBColorSpace;
  const scene=new T.Scene();
  scene.background=new T.Color(0x14231e);
  const camera=new T.PerspectiveCamera(55,1,0.1,65);
  const guideCamera=new T.PerspectiveCamera();
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;
  const canvas=renderer.domElement;
  canvas.setAttribute('aria-hidden','true');
  mount.append(canvas);
  const resources=new Set();
  const track=x=>{resources.add(x);return x};
  let disposed=false,frame=0,selected=initialIndex;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const dest=new T.Vector3(),destLook=new T.Vector3();
  const orientation=new T.Quaternion();
  let overviewMode=false;
  const panels=[];
  const material=(color)=>track(new T.MeshStandardMaterial({color,roughness:.83}));
  const wall=material(0x52665a),floor=material(0xb8ad92),trim=material(0xa48a56),ceiling=material(0xbfc4b4);
  const pilaster=material(0x768579),plinth=material(0x344c40),joint=material(0x99917d);
  const box=(w,h,d,x,y,z,mat)=>{
    const mesh=new T.Mesh(track(new T.BoxGeometry(w,h,d)),mat);
    mesh.position.set(x,y,z);scene.add(mesh);return mesh;
  };
  box(8.5,.18,28,0,-.09,-8,floor);
  box(.18,4.5,28,-4.15,2.25,-8,wall);
  box(.18,4.5,28,4.15,2.25,-8,wall);
  box(8.5,4.5,.18,0,2.25,-22,wall);
  box(8.5,.15,28,0,4.5,-8,ceiling);
  box(.12,.14,28,-4,0.12,-8,trim);box(.12,.14,28,4,.12,-8,trim);
  // Repeated architectural bays, a central stone walkway and display plinths.
  for(const z of [1,-6.5,-13.5,-20.5]){
    for(const side of [-1,1])box(.25,4.5,.32,side*3.99,2.25,z,pilaster);
    box(8.15,.22,.32,0,4.25,z,pilaster);
  }
  for(let z=5;z>-22;z-=1.4)box(8,.008,.018,0,.006,z,joint);
  for(const x of [-1.65,1.65])box(.045,.014,27,x,.012,-8,trim);
  scene.add(new T.HemisphereLight(0xfff6e7,0x9baf9f,2.7));
  scene.add(new T.AmbientLight(0xfff4df,.55));
  for(const z of [0,-7,-14,-21]){
    const l=new T.PointLight(0xffedd1,36,13,2);l.position.set(0,3.8,z);scene.add(l);
    box(3,.04,.1,0,4.37,z,track(new T.MeshBasicMaterial({color:0xffe6c1})));
  }
  const projectIds=['penguin','portfolio','todo','devflow','opus',null];
  function poster(chapter,i){
    const c=document.createElement('canvas');c.width=1024;c.height=680;
    const ctx=c.getContext('2d');
    const gold=i===4;
    const texture=track(new T.CanvasTexture(c));texture.colorSpace=T.SRGBColorSpace;
    texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    const draw=(img)=>{
      if(disposed)return;
      ctx.fillStyle=gold?'#343126':'#182a23';ctx.fillRect(0,0,1024,680);
      ctx.strokeStyle=gold?'#e6ce95':'#91ad98';ctx.lineWidth=4;ctx.strokeRect(18,18,988,644);
      ctx.fillStyle=gold?'#e6ce95':'#b7d7bf';ctx.font='bold 27px system-ui';ctx.fillText('TORRES ALMEIDA DIGITAL  /  0'+(i+1),48,63);
      if(img){
        const scale=Math.min(900/img.naturalWidth,440/img.naturalHeight);
        const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
        ctx.drawImage(img,(1024-w)/2,100+(440-h)/2,w,h);
      }else{
        ctx.textAlign='center';
        if(i===5){
          ctx.font='64px Georgia';ctx.fillText(tr('The journey continues','O percurso continua'),512,295,900);
          ctx.font='32px system-ui';ctx.fillText(tr('Training  /  Internship  /  New projects','Formação  /  Estágio  /  Novos projetos'),512,380,900);
        }else{
          ctx.font='100px Georgia';ctx.fillText(String(i+1).padStart(2,'0'),512,360);
        }
        ctx.textAlign='left';
      }
      ctx.fillStyle='#f4f1e7';ctx.font='bold 36px system-ui';
      const title=tr(...chapter.title);
      ctx.fillText(title,48,608,928);texture.needsUpdate=true;requestDraw();
    };
    draw();
    const p=profile.projects[projectIds[i]];
    const src=i===4?'../assets/opus-mark.svg':p?.image?'../'+p.image:null;
    if(src){const img=new Image();img.onload=()=>draw(img);img.src=src;}
    return texture;
  }
  chapters.forEach((chapter,i)=>{
    const side=i%2===0?-1:1,z=-3-Math.floor(i/2)*7;
    const group=new T.Group();group.position.set(side*3.94,2.25,z);group.rotation.y=side===-1?Math.PI/2:-Math.PI/2;scene.add(group);
    const frameMesh=new T.Mesh(track(new T.BoxGeometry(4.15,2.82,.12)),trim);group.add(frameMesh);
    const surface=new T.Mesh(track(new T.PlaneGeometry(4,2.65)),track(new T.MeshBasicMaterial({map:poster(chapter,i),toneMapped:false})));
    surface.position.z=.075;surface.userData.index=i;group.add(surface);panels.push(surface);
    // Small architectural ledge beneath each exhibit, not an interactive obstacle.
    box(.35,.13,4.3,side*3.78,.75,z,plinth);
    const spot=new T.SpotLight(0xfff1db,15,8,Math.PI/5,.75,2);
    spot.position.set(side*2.5,4.05,z+.25);
    spot.target.position.set(side*3.8,2.2,z);
    scene.add(spot,spot.target);
  });
  function draw(){
    frame=0;
    if(disposed)return;
    if(reduce.matches){camera.position.copy(dest);camera.quaternion.copy(orientation)}
    else{camera.position.lerp(dest,.115);camera.quaternion.slerp(orientation,.115)}
    renderer.render(scene,camera);
    if(camera.position.distanceTo(dest)>.003||camera.quaternion.angleTo(orientation)>.003)requestDraw();
  }
  function requestDraw(){if(!disposed&&!frame)frame=requestAnimationFrame(draw)}
  function orient(immediate=false){
    guideCamera.position.copy(dest);guideCamera.lookAt(destLook);
    orientation.copy(guideCamera.quaternion);
    if(immediate||reduce.matches){camera.position.copy(dest);camera.quaternion.copy(orientation)}
    requestDraw();
  }
  function focus(index,immediate=false){
    selected=index;overviewMode=false;
    const side=index%2===0?-1:1,z=-3-Math.floor(index/2)*7;
    const tangent=Math.tan(T.MathUtils.degToRad(camera.fov/2));
    const distance=Math.min(7,Math.max(3.55,4.15/(2*tangent*Math.max(.55,camera.aspect)*.82)));
    dest.set(side*(3.865-distance),2.25,z+.12);destLook.set(side*3.865,2.25,z);
    orient(immediate);
  }
  function overview(){
    overviewMode=true;
    dest.set(0,1.9,4);destLook.set(0,2,-15);orient();
  }
  function resize(){
    const w=mount.clientWidth,h=mount.clientHeight;
    if(!w||!h)return;
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    if(overviewMode)overview();else focus(selected,true);
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(mount);
  const ray=new T.Raycaster(),pointer=new T.Vector2();
  function pick(e){
    const rect=canvas.getBoundingClientRect();
    pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
    ray.setFromCamera(pointer,camera);
    const hit=ray.intersectObjects(panels,false)[0];
    if(hit)onSelect(hit.object.userData.index);
  }
  canvas.addEventListener('click',pick);
  const motion=()=>requestDraw();reduce.addEventListener?.('change',motion);
  focus(initialIndex,true);resize();
  return {focus,overview,dispose(){
    disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();
    canvas.removeEventListener('click',pick);reduce.removeEventListener?.('change',motion);
    for(const resource of resources)resource.dispose();
    renderer.dispose();canvas.remove();
  }};
}
