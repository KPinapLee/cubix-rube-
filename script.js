const cube = document.querySelector('.cube');
const MOVE_DELAY = 50; // 50ms cooldown

// Initialize cube state
const cubeState = {
  front: Array(9).fill('orange'),
  back: Array(9).fill('red'),
  right: Array(9).fill('green'),
  left: Array(9).fill('blue'),
  top: Array(9).fill('white'),
  bottom: Array(9).fill('yellow'),
};

// Generate stickers
document.querySelectorAll('.face').forEach(face => {
  for (let i = 0; i < 9; i++) {
    const sticker = document.createElement('div');
    sticker.className = 'sticker';
    face.appendChild(sticker);
  }
});

// =============================================
// Rotation Logic (Fixed)
// =============================================

const rotationMath = {
  cw: [6, 3, 0, 7, 4, 1, 8, 5, 2],
  ccw: [2, 5, 8, 1, 4, 7, 0, 3, 6],
  flip: [8, 7, 6, 5, 4, 3, 2, 1, 0]
};

function rotateFace(face, direction) {
  return direction.map(i => face[i]);
}

// =============================================
// Face Rotations (All Fixed)
// =============================================

function rotateRight(clockwise) {
  const state = {...cubeState};
  const tempFront = [state.front[2], state.front[5], state.front[8]];
  const tempTop = [state.top[2], state.top[5], state.top[8]];
  const tempBack = [state.back[6], state.back[3], state.back[0]];
  const tempBottom = [state.bottom[2], state.bottom[5], state.bottom[8]];

  cubeState.right = rotateFace(state.right, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.front[2], cubeState.front[5], cubeState.front[8]] = tempBottom;
    [cubeState.bottom[2], cubeState.bottom[5], cubeState.bottom[8]] = tempBack;
    [cubeState.back[6], cubeState.back[3], cubeState.back[0]] = tempTop;
    [cubeState.top[2], cubeState.top[5], cubeState.top[8]] = tempFront;
  } else {
    [cubeState.front[2], cubeState.front[5], cubeState.front[8]] = tempTop;
    [cubeState.top[2], cubeState.top[5], cubeState.top[8]] = tempBack;
    [cubeState.back[6], cubeState.back[3], cubeState.back[0]] = tempBottom;
    [cubeState.bottom[2], cubeState.bottom[5], cubeState.bottom[8]] = tempFront;
  }
}

function rotateLeft(clockwise) {
  const state = {...cubeState};
  const tempFront = [state.front[0], state.front[3], state.front[6]];
  const tempTop = [state.top[0], state.top[3], state.top[6]];
  const tempBack = [state.back[8], state.back[5], state.back[2]];
  const tempBottom = [state.bottom[0], state.bottom[3], state.bottom[6]];

  cubeState.left = rotateFace(state.left, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.front[0], cubeState.front[3], cubeState.front[6]] = tempTop;
    [cubeState.top[0], cubeState.top[3], cubeState.top[6]] = tempBack;
    [cubeState.back[8], cubeState.back[5], cubeState.back[2]] = tempBottom;
    [cubeState.bottom[0], cubeState.bottom[3], cubeState.bottom[6]] = tempFront;
  } else {
    [cubeState.front[0], cubeState.front[3], cubeState.front[6]] = tempBottom;
    [cubeState.bottom[0], cubeState.bottom[3], cubeState.bottom[6]] = tempBack;
    [cubeState.back[8], cubeState.back[5], cubeState.back[2]] = tempTop;
    [cubeState.top[0], cubeState.top[3], cubeState.top[6]] = tempFront;
  }
}

function rotateUp(clockwise) {
  const state = {...cubeState};
  const tempFront = [state.front[0], state.front[1], state.front[2]];
  const tempRight = [state.right[0], state.right[1], state.right[2]];
  const tempBack = [state.back[0], state.back[1], state.back[2]];
  const tempLeft = [state.left[0], state.left[1], state.left[2]];

  cubeState.top = rotateFace(state.top, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.front[0], cubeState.front[1], cubeState.front[2]] = tempRight;
    [cubeState.right[0], cubeState.right[1], cubeState.right[2]] = tempBack;
    [cubeState.back[0], cubeState.back[1], cubeState.back[2]] = tempLeft;
    [cubeState.left[0], cubeState.left[1], cubeState.left[2]] = tempFront;
  } else {
    [cubeState.front[0], cubeState.front[1], cubeState.front[2]] = tempLeft;
    [cubeState.left[0], cubeState.left[1], cubeState.left[2]] = tempBack;
    [cubeState.back[0], cubeState.back[1], cubeState.back[2]] = tempRight;
    [cubeState.right[0], cubeState.right[1], cubeState.right[2]] = tempFront;
  }
}

function rotateDown(clockwise) {
  const state = {...cubeState};
  const tempFront = [state.front[6], state.front[7], state.front[8]];
  const tempRight = [state.right[6], state.right[7], state.right[8]];
  const tempBack = [state.back[6], state.back[7], state.back[8]];
  const tempLeft = [state.left[6], state.left[7], state.left[8]];

  cubeState.bottom = rotateFace(state.bottom, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.front[6], cubeState.front[7], cubeState.front[8]] = tempLeft;
    [cubeState.left[6], cubeState.left[7], cubeState.left[8]] = tempBack;
    [cubeState.back[6], cubeState.back[7], cubeState.back[8]] = tempRight;
    [cubeState.right[6], cubeState.right[7], cubeState.right[8]] = tempFront;
  } else {
    [cubeState.front[6], cubeState.front[7], cubeState.front[8]] = tempRight;
    [cubeState.right[6], cubeState.right[7], cubeState.right[8]] = tempBack;
    [cubeState.back[6], cubeState.back[7], cubeState.back[8]] = tempLeft;
    [cubeState.left[6], cubeState.left[7], cubeState.left[8]] = tempFront;
  }
}

function rotateFront(clockwise) {
  const state = {...cubeState};
  const tempTop = [state.top[6], state.top[7], state.top[8]];
  const tempRight = [state.right[0], state.right[3], state.right[6]];
  const tempBottom = [state.bottom[2], state.bottom[1], state.bottom[0]];
  const tempLeft = [state.left[8], state.left[5], state.left[2]];

  cubeState.front = rotateFace(state.front, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.top[6], cubeState.top[7], cubeState.top[8]] = tempLeft;
    [cubeState.left[8], cubeState.left[5], cubeState.left[2]] = tempBottom;
    [cubeState.bottom[2], cubeState.bottom[1], cubeState.bottom[0]] = tempRight;
    [cubeState.right[0], cubeState.right[3], cubeState.right[6]] = tempTop;
  } else {
    [cubeState.top[6], cubeState.top[7], cubeState.top[8]] = tempRight;
    [cubeState.right[0], cubeState.right[3], cubeState.right[6]] = tempBottom;
    [cubeState.bottom[2], cubeState.bottom[1], cubeState.bottom[0]] = tempLeft;
    [cubeState.left[8], cubeState.left[5], cubeState.left[2]] = tempTop;
  }
}

function rotateBack(clockwise) {
  const state = {...cubeState};
  const tempTop = [state.top[0], state.top[1], state.top[2]];
  const tempRight = [state.right[2], state.right[5], state.right[8]];
  const tempBottom = [state.bottom[8], state.bottom[7], state.bottom[6]];
  const tempLeft = [state.left[6], state.left[3], state.left[0]];

  cubeState.back = rotateFace(state.back, clockwise ? rotationMath.cw : rotationMath.ccw);

  if (clockwise) {
    [cubeState.top[0], cubeState.top[1], cubeState.top[2]] = tempRight;
    [cubeState.right[2], cubeState.right[5], cubeState.right[8]] = tempBottom;
    [cubeState.bottom[8], cubeState.bottom[7], cubeState.bottom[6]] = tempLeft;
    [cubeState.left[6], cubeState.left[3], cubeState.left[0]] = tempTop;
  } else {
    [cubeState.top[0], cubeState.top[1], cubeState.top[2]] = tempLeft;
    [cubeState.left[6], cubeState.left[3], cubeState.left[0]] = tempBottom;
    [cubeState.bottom[8], cubeState.bottom[7], cubeState.bottom[6]] = tempRight;
    [cubeState.right[2], cubeState.right[5], cubeState.right[8]] = tempTop;
  }
}

// =============================================
// Cube Rotations (Fixed)
// =============================================

function rotateCubeX(clockwise) {
  const original = {...cubeState};
  
  cubeState.front = clockwise ? original.bottom : original.top;
  cubeState.back = clockwise ? rotateFace(original.top, rotationMath.flip) : rotateFace(original.bottom, rotationMath.flip);
  cubeState.top = clockwise ? original.front : rotateFace(original.back, rotationMath.flip);
  cubeState.bottom = clockwise ? rotateFace(original.back, rotationMath.flip) : original.front;
  
  cubeState.right = rotateFace(original.right, clockwise ? rotationMath.cw : rotationMath.ccw);
  cubeState.left = rotateFace(original.left, clockwise ? rotationMath.ccw : rotationMath.cw);
}

function rotateCubeY(clockwise) {
  const original = {...cubeState};
  
  cubeState.front = clockwise ? original.right : original.left;
  cubeState.right = clockwise ? original.back : original.front;
  cubeState.back = clockwise ? original.left : original.right;
  cubeState.left = clockwise ? original.front : original.back;
  
  cubeState.top = rotateFace(original.top, clockwise ? rotationMath.cw : rotationMath.ccw);
  cubeState.bottom = rotateFace(original.bottom, clockwise ? rotationMath.ccw : rotationMath.cw);
}

function rotateCubeZ(clockwise) {
  const original = {...cubeState};
  
  cubeState.top = rotateFace(clockwise ? original.left : original.right, rotationMath.ccw);
  cubeState.right = rotateFace(clockwise ? original.top : original.bottom, rotationMath.ccw);
  cubeState.bottom = rotateFace(clockwise ? original.right : original.left, rotationMath.ccw);
  cubeState.left = rotateFace(clockwise ? original.bottom : original.top, rotationMath.ccw);
  
  cubeState.front = rotateFace(original.front, clockwise ? rotationMath.cw : rotationMath.ccw);
  cubeState.back = rotateFace(original.back, clockwise ? rotationMath.ccw : rotationMath.cw);
}

// =============================================
// Queue System with Cooldown
// =============================================

let isProcessing = false;
const moveQueue = [];

function processQueue() {
  if (isProcessing || moveQueue.length === 0) return;
  
  isProcessing = true;
  const { move, args } = moveQueue.shift();
  
  move(...args);
  updateCube();
  
  setTimeout(() => {
    isProcessing = false;
    processQueue();
  }, MOVE_DELAY);
}

function queueMove(move, ...args) {
  moveQueue.push({ move, args });
  processQueue();
}

// =============================================
// Visual Update with Smooth Animations
// =============================================

function updateCube() {
  Object.entries(cubeState).forEach(([face, colors]) => {
    const stickers = document.querySelector(`.${face}`).querySelectorAll('.sticker');
    stickers.forEach((sticker, i) => {
      sticker.style.transition = 'background-color 0.2s ease-in-out';
      sticker.style.backgroundColor = colors[i];
    });
  });
}

// =============================================
// Input Handling
// =============================================

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;

  const moves = {
    // Face rotations
    'r': () => queueMove(rotateRight, true),
    'R': () => queueMove(rotateRight, false),
    'l': () => queueMove(rotateLeft, true),
    'L': () => queueMove(rotateLeft, false),
    'u': () => queueMove(rotateUp, true),
    'U': () => queueMove(rotateUp, false),
    'd': () => queueMove(rotateDown, true),
    'D': () => queueMove(rotateDown, false),
    'f': () => queueMove(rotateFront, true),
    'F': () => queueMove(rotateFront, false),
    'b': () => queueMove(rotateBack, true),
    'B': () => queueMove(rotateBack, false),
    
    // Cube rotations
    'x': () => queueMove(rotateCubeX, true),
    'X': () => queueMove(rotateCubeX, false),
    'y': () => queueMove(rotateCubeY, true),
    'Y': () => queueMove(rotateCubeY, false),
    'z': () => queueMove(rotateCubeZ, true),
    'Z': () => queueMove(rotateCubeZ, false)
  };

  if (moves[e.key]) moves[e.key]();
});

// Initial update
updateCube();