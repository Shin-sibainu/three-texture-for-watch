import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//UIデバッグ
const gui = new dat.GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

//テクスチャ
const textureLoader = new THREE.TextureLoader();
const baseTexture = textureLoader.load("./textures/baseMap.jpg");
const normalMapTexture = textureLoader.load("./textures/normalMap.jpg");
const heightMapTexture = textureLoader.load("./textures/heightMap.png");
const roughnessMapTexture = textureLoader.load("./textures/roughnessMap.jpg");
const aoMapTexture = textureLoader.load("./textures/aoMap.jpg");

//マテリアル
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
});

//cube1
const materialPlane1 = new THREE.MeshStandardMaterial({
  map: baseTexture,
});
//cube2
const materialPlane2 = new THREE.MeshStandardMaterial({
  map: baseTexture,
  normalMap: normalMapTexture, //法線マップ。法線ベクトルの向きを画像の色で指定し、ポリゴンの表面に凸凹があるように見せかける手法。
});
//cube3
const materialPlane3 = new THREE.MeshStandardMaterial({
  map: baseTexture,
  normalMap: normalMapTexture,
  displacementMap: heightMapTexture,
  displacementScale: 0.1,
});
//cube4
const materialPlane4 = new THREE.MeshStandardMaterial({
  map: baseTexture,
  normalMap: normalMapTexture,
  displacementMap: heightMapTexture,
  displacementScale: 0.1,
  roughnessMap: roughnessMapTexture,
  roughness: 0.5,
});
//cube5
const materialPlane5 = new THREE.MeshStandardMaterial({
  map: baseTexture,
  normalMap: normalMapTexture,
  displacementMap: heightMapTexture,
  displacementScale: 0.1,
  roughnessMap: roughnessMapTexture,
  roughness: 0.5,
  aoMap: aoMapTexture,
});

//オブジェクト
const plane1 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75),
  materialPlane1
);

plane1.position.x = -2;

const plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75),
  materialPlane2
);
plane2.position.x = -1;

const plane3 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75, 512, 512),
  materialPlane3
);
plane3.position.x = 0;

const plane4 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75, 512, 512),
  materialPlane4
);
plane4.position.x = 1;

const plane5 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75, 512, 512),
  materialPlane5
);
plane5.position.x = 2;
console.log(plane5.geometry.attributes);
plane5.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane5.geometry.attributes.uv.array, 2)
);

//metalnessが見つからない。
const plane6 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75),
  materialPlane1
);

const basePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  planeMaterial
);
basePlane.rotation.x = -Math.PI * 0.5;
basePlane.position.y = -0.65;

scene.add(plane1, plane2, plane3, plane4, plane5, basePlane);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//コントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001).name("ambient");

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.52);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("directional");

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // cube.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = 0.15 * elapsedTime;
  // cube.rotation.x = 0.15 * elapsedTime;
  // torus.rotation.x = 0.15 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
