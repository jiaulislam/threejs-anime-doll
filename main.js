import * as Utils from "./modules/circle";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Figure from "./modules/Figure";
import { degreesToRadians } from "./modules/circle";

const sizes = {
  height: document.innerHeight,
  width: document.innerWidth,
};

const input = document.querySelector("[data-input]");

const scn = Utils.makeScene();
const figure = new Figure({ scene: scn });
figure.group.rotation.y = degreesToRadians(-15);
const cmra = Utils.makePerspectiveCamera();
cmra.position.z = 5;
const renderer = Utils.makeRenderer(1024, 500);

const lighting = Utils.getAmbientLight(0xefefef, 1);
const lightinglime = Utils.getAmbientLightProbe(0xefefef, 1);
const ob = new OrbitControls(cmra, renderer.domElement);

scn.add(lighting);
scn.add(lightinglime);

figure.init();
renderer.render(scn, cmra);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scn, cmra);
}
animate();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  cmra.aspect = sizes.width / sizes.height;
  cmra.updateProjectionMatrix();

  // Update renderer
  renderer.render(scn, cmra);
});

input.addEventListener("input", (e) => {
  figure.params.angle = e.target.value;
  figure.moveArms();
  renderer.render(scn, cmra);
});

document.querySelector("#app").appendChild(renderer.domElement);
