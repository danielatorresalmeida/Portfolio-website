// Procedural exhibit models. All objects use local coordinates: +Z faces the visitor.
export function buildInstallation(T,group,index,texture,track){
  const hits=[];
  const matte=(color)=>track(new T.MeshStandardMaterial({color,roughness:.73}));
  const ivory=matte(0xe5ddc9),green=matte(0x34584a),black=matte(0x17231f),brass=matte(0xb79a57),wood=matte(0x846b49);
  const glow=track(new T.MeshBasicMaterial({color:0xf9e4b2,toneMapped:false}));
  const mint=track(new T.MeshBasicMaterial({color:0xb8d8bf,toneMapped:false}));
  const add=(geometry,material,x,y,z)=>{
    const mesh=new T.Mesh(track(geometry),material);
    mesh.position.set(x,y,z);mesh.userData.index=index;group.add(mesh);hits.push(mesh);return mesh;
  };
  const box=(w,h,d,x,y,z,m)=>add(new T.BoxGeometry(w,h,d),m,x,y,z);
  const sphere=(radius,x,y,z,m)=>add(new T.SphereGeometry(radius,16,12),m,x,y,z);
  const screen=(w,h,x,y,z)=>{
    box(w+.16,h+.16,.16,x,y,z,black);
    return add(new T.PlaneGeometry(w,h),track(new T.MeshBasicMaterial({map:texture,toneMapped:false})),x,y,z+.09);
  };
  const segment=(a,b,r,m)=>{
    const from=new T.Vector3(...a),to=new T.Vector3(...b),delta=to.clone().sub(from);
    const mesh=add(new T.CylinderGeometry(r,r,delta.length(),10),m,...from.clone().add(to).multiplyScalar(.5).toArray());
    mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return mesh;
  };
  if(index===0){
    // Retro computer, actual project screenshot on its screen.
    box(3.55,.14,1.02,0,-1.34,.53,wood);
    box(2.95,2.02,.62,0,.03,.39,ivory);
    screen(2.59,1.66,0,.09,.72);
    box(2.6,.18,.65,0,-1.08,.98,black);
    for(let row=0;row<3;row++)for(let col=0;col<11;col++){
      box(.185,.045,.13,(col-5)*.218,-.965,.77+row*.16,ivory);
    }
    box(.9,.045,.13,0,-.965,1.26,ivory);
    sphere(.055,1.25,-.82,.72,mint);
  }else if(index===1){
    // Responsive device sculpture: the tablet/phone silhouettes are conceptual.
    box(3.95,.13,.9,0,-1.31,.5,wood);
    screen(2.64,1.75,-.43,.24,.28);
    box(.16,.58,.18,-.43,-.91,.3,black);
    box(.86,.10,.5,-.43,-1.19,.4,black);
    box(.94,1.34,.12,1.27,-.49,.73,black);
    box(.79,1.15,.025,1.27,-.49,.805,green);
    box(.46,.85,.12,1.77,-.83,1.02,black);
    box(.36,.67,.025,1.77,-.83,1.095,green);
    for(let i=0;i<3;i++){
      box(.52,.055,.028,1.27,-.21-i*.22,.824,mint);
      box(.23,.045,.028,1.77,-.62-i*.17,1.114,mint);
    }
  }else if(index===2){
    // Interactive kiosk; linked chapter includes the actual state demonstration.
    box(1.8,.15,.9,0,-1.44,.56,black);
    box(.68,.95,.45,0,-.92,.41,green);
    screen(3.25,2.15,0,.22,.32);
    box(2.5,.13,.38,0,-1.02,.57,brass);
    for(let i=0;i<3;i++)sphere(.075,(i-1)*.28,-.91,.71,i===1?mint:ivory);
  }else if(index===3){
    // Conceptual architecture sculpture, not a screenshot or live API.
    box(3.75,.15,.95,0,-1.35,.52,wood);
    const points=[[-1.35,-.35,.65],[0,.36,.65],[1.35,-.35,.65],[0,-.82,.65]];
    for(const [a,b] of [[0,1],[1,2],[1,3]])segment(points[a],points[b],.045,brass);
    points.forEach((p,i)=>{
      box(.62,.54,.43,...p,i===1?green:black);
      sphere(.09,p[0],p[1]+.06,p[2]+.245,mint);
    });
    // Three database discs and small status lights.
    for(let j=0;j<3;j++)add(new T.CylinderGeometry(.31,.31,.12,24),brass,0,-.94+j*.14,.65);
    screen(3.25,.81,0,1.03,.18);
  }else if(index===4){
    // OPUS: a music workstation with a stylised piano keyboard.
    box(3.8,.20,.95,0,-1.12,.65,wood);
    box(.18,.53,.72,-1.66,-1.47,.65,wood);
    box(.18,.53,.72,1.66,-1.47,.65,wood);
    screen(2.86,1.88,0,.29,.20);
    for(let i=0;i<15;i++)box(.205,.085,.73,(i-7)*.224,-.975,.79,ivory);
    for(const i of [0,1,3,4,5,7,8,10,11,12]){
      box(.12,.09,.39,(i-6.5)*.224,-.89,.64,black);
    }
    box(3.32,.1,.17,0,-.90,.33,brass);
  }else{
    // Symbolic portal: not a walk-through doorway.
    box(3.65,3.18,.14,0,-.12,.2,green);
    box(.21,3.2,.62,-1.72,-.12,.35,brass);
    box(.21,3.2,.62,1.72,-.12,.35,brass);
    box(3.65,.22,.62,0,1.37,.35,brass);
    box(.065,2.85,.08,-1.53,-.16,.7,glow);
    box(.065,2.85,.08,1.53,-.16,.7,glow);
    screen(2.98,1.97,0,.05,.38);
    box(3.8,.12,1.05,0,-1.73,.55,wood);
  }
  return hits;
}
