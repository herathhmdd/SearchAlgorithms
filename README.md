# Lost Key Search Algorithm Visualization

This repository contains a comprehensive web-based visualization of various search algorithms used in artificial intelligence. The project models a two-story house as a graph to demonstrate finding a lost key using different search strategies.

## Overview

This interactive visualization demonstrates nine different search algorithms through a step-by-step animated process. The house layout serves as a realistic graph structure where users can observe how different algorithms explore the search space to find a target room.

## Features

### 🏠 House Layout (Graph Structure)
- **First Floor**: Living Room, Dining Room, Kitchen, Garage, Study Room, Common Room 1, Storage Room, Common Bathroom, Staircase
- **Second Floor**: Master Bedroom, Master Bathroom, Bedroom 1-6, Second Floor Living Room (SFLR)
- **Realistic Connections**: All rooms are connected based on a logical house layout with 18 total rooms
- **Visual Layout**: Rooms are positioned to resemble an actual two-story house floor plan

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
- **Path Highlighting**: Final solution path is clearly marked on the graph
- **Final Path Display**: Complete path from start to goal shown with arrow icons (→) in the Search States section
- **Map Legend**: Visual reference showing room locations and connections
- **Algorithm Information**: Real-time status and algorithm-specific details
- **Responsive Design**: Adapts to different screen sizes with scrollable containers

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
3. Start a local HTTP server (recommended):
   ```bash
   python -m http.server 8080
   ```
4. Open your web browser and navigate to `http://localhost:8080`
5. Alternatively, you can directly open `index.html` in your web browser
6. Select a search algorithm, start room, and goal room
7. Click "Start Search" to begin the visualization
8. Observe the final path displayed in the Search States section with arrow navigation
9. Use "Reset" to clear the visualization and try different configurations

### Usage Instructions
1. **Algorithm Selection**: Choose from 9 different search algorithms using the dropdown menu
2. **Room Selection**: Select any of the 18 rooms as start and goal points (must be different)
3. **Visualization Control**: Click "Start Search" and watch the step-by-step algorithm execution
4. **Path Analysis**: Observe the final path displayed with arrow navigation in the Search States section
5. **Map Reference**: Use the legend on the right to understand room locations and connections
6. **Reset Function**: Clear the current search and try different algorithm/room combinations
7. **Educational Observation**: Compare different algorithms' exploration patterns and path optimality

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
- **Framework**: D3.js for SVG-based visualization and interactive graphics
- **Timing**: Configurable delays for clear step-by-step observation (300-800ms)
- **States**: Smooth transitions between different node states with CSS animations
- **Final Path Rendering**: Automatic display of complete solution path with arrow navigation
- **Responsiveness**: Adapts to different screen sizes with scrollable containers
- **User Experience**: Intuitive controls with immediate visual feedback

## Educational Value

This project serves as an excellent educational tool for understanding:
- **Search Strategy Differences**: Visual comparison of algorithm behaviors and exploration patterns
- **Performance Analysis**: Observation of path optimality, solution efficiency, and exploration patterns
- **Graph Theory Applications**: Real-world graph representation and traversal in a familiar context
- **Algorithm Animation**: Step-by-step execution visualization with clear final path display
- **Interactive Learning**: Hands-on experience with different start/goal combinations
- **Algorithm Comparison**: Easy switching between algorithms to observe behavioral differences

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
- Additional search algorithms (Best-First, Hill Climbing, Simulated Annealing)
- Performance metrics display (nodes explored, time complexity, memory usage)
- Custom graph creation functionality for different house layouts
- Algorithm comparison mode with side-by-side visualization
- Export functionality for educational presentations and reports
- Path cost analysis and optimization metrics
- Interactive tutorial mode with guided explanations
- Mobile-responsive touch interface improvements

## License
This project is created for educational purposes as part of the University of Moratuwa coursework.

## Author
**herathhmdd** - MSc in AI Batch 18, University of Moratuwa