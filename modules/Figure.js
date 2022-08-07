import {
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  BoxHelper,
  SphereGeometry,
} from "three";
import { degreesToRadians } from "./circle";

export default class Figure {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0,
      ...params,
    };
    this.group = new Group();

    // Position according to params
    this.group.position.x = this.params.x;
    this.group.position.y = this.params.y;
    this.group.position.z = this.params.z;
    this.group.rotation.y = this.params.ry;
    this.arms = [];
    params.scene?.add(this.group);
  }

  createBody() {
    this.body = new Group();

    const geometry = new BoxGeometry(1, 1.5, 1);
    const material = new MeshLambertMaterial({ color: 0xaaaaaa });
    const bodyMain = new Mesh(geometry, material);
    this.body.add(bodyMain);
    this.group.add(this.body);
    this.createLegs();
  }

  createHead() {
    this.head = new Group();

    const geometry = new BoxGeometry(1.4, 1.4, 1.4);
    const material = new MeshLambertMaterial({ color: 0xaaaaaa });
    const headMain = new Mesh(geometry, material);
    this.head.add(headMain);
    this.group.add(this.head);

    this.head.position.y = 1.65;
    this.createEyes();
  }

  createArms() {
    const height = 1;
    const geometry = new BoxGeometry(0.25, height, 0.25);
    for (let i = 0; i < 2; i++) {
      const material = new MeshLambertMaterial({ color: 0xaaaaaa });
      const arm = new Mesh(geometry, material);

      const m = i % 2 === 0 ? 1 : -1;
      const armGroup = new Group();

      armGroup.add(arm);
      this.arms.push(armGroup);
      this.group.add(armGroup);

      arm.position.y = height * -0.5;
      armGroup.position.x = m * 0.8;
      armGroup.position.y = 0.6;

      armGroup.rotation.z = degreesToRadians(30 * m);
    }
  }

  createEyes() {
    const eyes = new Group();
    const geometry = new SphereGeometry(0.15, 12, 8);
    const material = new MeshLambertMaterial({ color: 0x44445c });

    for (let i = 0; i < 2; i++) {
      const eye = new Mesh(geometry, material);
      const m = i % 2 === 0 ? 1 : -1;
      eyes.add(eye);
      eye.position.x = 0.35 * m;
    }
    this.head.add(eyes);
    eyes.position.z = 0.7;
  }

  createLegs() {
    const legs = new Group();
    const geometry = new BoxGeometry(0.35, 0.8, 0.25);
    const material = new MeshLambertMaterial({ color: 0xaaaaaa });

    for (let i = 0; i < 2; i++) {
      const leg = new Mesh(geometry, material);
      const m = i % 2 === 0 ? 1 : -1;
      legs.add(leg);
      leg.position.x = 0.22 * m;
    }

    this.group.add(legs);
    legs.position.y = -1.15;
    this.body.add(legs);
  }

  moveArms() {
    this.arms.forEach((arm, i) => {
      const m = i % 2 === 0 ? 1 : -1;
      arm.rotation.z = degreesToRadians(this.params.angle * m);
    });
  }

  init() {
    this.createBody();
    this.createHead();
    this.createArms();
  }
}
