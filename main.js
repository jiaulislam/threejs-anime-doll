import * as Utils from "./modules/circle";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Figure from "./modules/Figure";
import { degreesToRadians } from "./modules/circle";

// default window sizes
const sizes = {
  height: document.innerHeight,
  width: document.innerWidth,
};

// where the controller should go
const input = document.querySelector("[data-input]");

const scene = Utils.makeScene();
const figure = new Figure({
  scene: scene,
});
figure.group.rotation.y = degreesToRadians(-15);
const camera = Utils.makePerspectiveCamera();
camera.position.z = 8;
const renderer = Utils.makeRenderer(1024, 500);

const lighting = Utils.getAmbientLight(0xefefef, 1);
const lightinglime = Utils.getAmbientLightProbe(0x3cfeff, 0.2);

// orbit controller to controll the scene with mouse click
const orbitController = new OrbitControls(camera, renderer.domElement);

scene.add(lighting);
scene.add(lightinglime);

figure.init();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.render(scene, camera);
});

input.addEventListener("input", (e) => {
  figure.params.angle = e.target.value;
  figure.moveArms();
  renderer.render(scene, camera);
});

document.querySelector("#app").appendChild(renderer.domElement);
