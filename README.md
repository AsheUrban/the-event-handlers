# _The Event Handlers_

#### By _Ashe Urban, Thomas Taylor, and Ryan Spencer_

## Technologies Used
* _JavaScript_
* _HTML_
* _CSS_
* _Webpack_
* _npm_
* _Node.js_

## Description
_The Event Handlers_ is a 2D side-scrolling browser game built from scratch using Vanilla JavaScript. Players navigate through an obstacle-filled world, avoiding hazards and accumulating points. The game implements functional win/lose logic, collision detection, and a dynamic scoring system based on player performance.

The project emphasizes clean separation of concerns, modular code structure, and the fundamentals of real-time gameplay loops — including gravity simulation, movement physics, and input-based event handling. It demonstrates how to manage animation frames, track state, and structure reusable components without reliance on external game frameworks.

## Setup/Installation Requirements
* Clone this repository to your local machine:
  ```bash
  git clone https://github.com/AsheUrban/the-event-handlers.git
  ```
* Navigate into the project directory:
  ```bash
  cd the-event-handlers
  ```
* Install all dependencies:
  ```bash
  npm install
  ```
* Build and launch the project in development mode:
  ```bash
  npm run start
  ```
  This command uses Webpack to compile the JavaScript files and automatically open the game in your default browser at:
  ```
  http://localhost:8080/
  ```
* Once the game launches:
  - Use the **arrow keys** (← ↑ ↓ →) or **WASD keys** to move your character.
  - Avoid obstacles and survive as long as possible to increase your score.
  - If you collide with an obstacle, a game-over screen will appear.
  - To restart, simply refresh the browser window or press the reset button if available.

## Known Bugs
* _None known at this time._

## License
_This software is provided for educational purposes only and is not intended for commercial use._    

Copyright (c) _2023_  
_Ashe Urban, Thomas Taylor, and Ryan Spencer_