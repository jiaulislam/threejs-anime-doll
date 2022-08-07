import {
  BoxGeometry,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  Mesh,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight,
  AmbientLightProbe,
} from "three";

export function makeScene(background = 0xeeeecc) {
  const scene = new Scene();
  scene.background = background;
  return scene;
}

export function makePerspectiveCamera() {
  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  return camera;
}

export function makeRenderer(
  width = window.innerWidth,
  height = window.innerHeight
) {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  return renderer;
}

export function makeCube() {
  const circleGeometry = new BoxGeometry(1, 1, 1);
  const circleMaterial = new MeshLambertMaterial({ color: 0xffffff });
  return new Mesh(circleGeometry, circleMaterial);
}

export function directionalLight() {
  const directionLight = new DirectionalLight(0xffffff, 1);
  return directionLight;
}

export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function getAmbientLight(color, density) {
  return new AmbientLight(color, density);
}

export function getAmbientLightProbe(color, density) {
  return new AmbientLightProbe(color, density);
}
