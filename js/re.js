/* eslint-disable linebreak-style */
const keyState = {};
window.addEventListener('keydown', (e) => {
  keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', (e) => {
  keyState[e.keyCode || e.which] = false;
}, true);

function gameLoop() {
  if (keyState[37] || keyState[65]) {
    box.rotation.z += 0.05;
  } else
  if (keyState[39] || keyState[68]) {
    box.rotation.z -= 0.05;
  } else if (keyState[38] || keyState[87]) {
    box.rotation.x -= 0.05;
  } else
  if (keyState[40] || keyState[83]) {
    box.rotation.x += 0.05;
  }

  setTimeout(gameLoop, 10);
}
gameLoop();
