# Lost Key Search Algorithm Visualization

This repository contains a comprehensive web-based visualization of various search algorithms used in artificial intelligence. The project models a two-story house as a graph to demonstrate finding a lost key using different search strategies.

## Overview

This interactive visualization demonstrates nine different search algorithms through a step-by-step animated process. The house layout serves as a realistic graph structure where users can observe how different algorithms explore the search space to find a target room.

## Features

### 🏠 House Layout (Graph Structure)
- **First Floor**: Living Room, Dining Room, Kitchen, Garage, Study Room, Common Room 1, Storage Room, Common Bathroom, Staircase
- **Second Floor**: Master Bedroom, Master Bathroom, Bedroom 1-6, Common Room 2
- **Realistic Connections**: All rooms are connected based on a logical house layout

### 🔍 Search Algorithms Implemented

#### Uninformed Search Algorithms:
1. **Breadth-First Search (BFS)** - Explores nodes level by level
2. **Depth-First Search (DFS)** - Explores as far as possible along each branch
3. **Depth-Limited Search** - DFS with a depth limit of 3
4. **Iterative Deepening Search** - Combines benefits of DFS and BFS
5. **Uniform Cost Search** - Always expands the lowest cost path first
6. **Bidirectional Search** - Searches simultaneously from start and goal

#### Informed Search Algorithms:
7. **A* Search** - Uses heuristic function for optimal pathfinding
8. **Greedy Best-First Search** - Always chooses the node closest to goal
9. **Iterative Deepening A* (IDA*)** - Memory-efficient version of A*

### 🎨 Visualization Features
- **Real-time Animation**: Step-by-step visual representation of algorithm execution
- **Color-coded States**: 
  - Gray: Default/unvisited nodes
  - Yellow: Currently visiting nodes (with pulse animation)
  - Dark gray: Visited nodes
  - Green: Final path (with glow effect)
  - Red: Goal found (with bounce animation)
- **Interactive Controls**: Dropdown menus for algorithm and room selection
- **Path Highlighting**: Final solution path is clearly marked
- **Algorithm Information**: Real-time status and algorithm-specific details

## Project Structure

```
SearchAlgorithms/
├── index.html          # Main HTML structure and UI components
├── style.css           # Modern styling with animations and responsive design
├── script.js           # Complete algorithm implementations and D3.js visualization
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Running the Application
1. Clone this repository:
   ```bash
   git clone https://github.com/herathhmdd/SearchAlgorithms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SearchAlgorithms
   ```
3. Open `index.html` in your web browser
4. Select a search algorithm, start room, and goal room
5. Click "Start Search" to begin the visualization
6. Use "Reset" to clear the visualization and try different configurations

### Usage Instructions
1. **Algorithm Selection**: Choose from 9 different search algorithms
2. **Room Selection**: Select any of the 18 rooms as start and goal points
3. **Visualization Control**: Watch the step-by-step algorithm execution
4. **Path Analysis**: Observe the final path and algorithm performance

## Technical Implementation

### Graph Representation
- **Data Structure**: JavaScript object with adjacency list representation
- **Node Positioning**: Logical 2D coordinates resembling actual house layout
- **Edge Weights**: Uniform cost of 1 for all connections

### Heuristic Function
- **Type**: Manhattan distance approximation
- **Purpose**: Guides informed search algorithms (A*, Greedy, IDA*)
- **Implementation**: Calculated based on coordinate differences

### Animation System
- **Framework**: D3.js for SVG-based visualization
- **Timing**: Configurable delays for clear step-by-step observation
- **States**: Smooth transitions between different node states
- **Responsiveness**: Adapts to different screen sizes

## Educational Value

This project serves as an excellent educational tool for understanding:
- **Search Strategy Differences**: Visual comparison of algorithm behaviors
- **Performance Analysis**: Observation of path optimality and exploration patterns
- **Graph Theory Applications**: Real-world graph representation and traversal
- **Algorithm Animation**: Step-by-step execution visualization

## Technologies Used
- **HTML5**: Modern semantic structure
- **CSS3**: Advanced styling with animations and responsive design
- **JavaScript ES6+**: Modern programming features and async/await
- **D3.js**: Powerful data visualization library for interactive graphics

## Course Information
- **Course**: IT5431 - Essentials of Artificial Intelligence
- **Institution**: University of Moratuwa
- **Program**: MSc in AI Batch 18
- **Purpose**: Demonstration project for search algorithm concepts

## Future Enhancements
- Additional search algorithms (Best-First, Hill Climbing)
- Performance metrics display (nodes explored, time complexity)
- Custom graph creation functionality
- Algorithm comparison mode
- Export functionality for educational presentations

## License
This project is created for educational purposes as part of the University of Moratuwa coursework.

## Author
**herathhmdd** - MSc in AI Batch 18, University of Moratuwa