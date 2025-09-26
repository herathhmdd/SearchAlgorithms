// House Graph Data Structure
const houseGraph = {
    // Node definitions with positions for visualization
    nodes: {
        // First Floor
        'SR': { name: 'Study Room', floor: 1, x: 50, y: 120 },
        'CR1': { name: 'Common Room 1', floor: 1, x: 200, y: 120 },
        'CB': { name: 'Common Bathroom', floor: 1, x: 350, y: 120 },
        'LR': { name: 'Living Room', floor: 1, x: 200, y: 200 },
        'DR': { name: 'Dining Room', floor: 1, x: 350, y: 200 },
        'K': { name: 'Kitchen', floor: 1, x: 500, y: 200 },
        'G': { name: 'Garage', floor: 1, x: 650, y: 200 },
        'STR': { name: 'Storage Room', floor: 1, x: 650, y: 280 },
        'STAIRCASE': { name: 'Staircase', floor: 1.5, x: 100, y: 280 },

        // Second Floor
        'SFLR': { name: 'Second Floor Living Room', floor: 2, x: 200, y: 450 },
        'MB': { name: 'Master Bedroom', floor: 2, x: 350, y: 450 },
        'MBR': { name: 'Master Bathroom', floor: 2, x: 500, y: 450 },
        'BR1': { name: 'Bedroom 1', floor: 2, x: 200, y: 550 },
        'BR2': { name: 'Bedroom 2', floor: 2, x: 350, y: 550 },
        'BR3': { name: 'Bedroom 3', floor: 2, x: 150, y: 650 },
        'BR4': { name: 'Bedroom 4', floor: 2, x: 400, y: 650 },
        'BR5': { name: 'Bedroom 5', floor: 2, x: 100, y: 750 },
        'BR6': { name: 'Bedroom 6', floor: 2, x: 450, y: 750 }
    },

    // Adjacency list representing connections
    adjacencyList: {
        'LR': ['DR', 'CR1', 'STAIRCASE'],
        'DR': ['LR', 'K'],
        'K': ['DR', 'G'],
        'G': ['K', 'STR'],
        'CR1': ['LR', 'CB', 'SR'],
        'SR': ['CR1'],
        'CB': ['CR1'],
        'STR': ['G'],
        'STAIRCASE': ['LR', 'SFLR'],
        'SFLR': ['STAIRCASE', 'MB', 'BR1', 'BR2'],
        'MB': ['SFLR', 'MBR'],
        'MBR': ['MB'],
        'BR1': ['SFLR', 'BR3'],
        'BR2': ['SFLR', 'BR4'],
        'BR3': ['BR1', 'BR5'],
        'BR4': ['BR2', 'BR6'],
        'BR5': ['BR3'],
        'BR6': ['BR4']
    }
};

// Global variables
let svg, simulation, currentSearch = null;
let isSearching = false;

// Heuristic function for informed searches
function heuristic(node, goal) {
    const nodePos = houseGraph.nodes[node];
    const goalPos = houseGraph.nodes[goal];
    
    // Manhattan distance as heuristic
    return Math.abs(nodePos.x - goalPos.x) / 50 + Math.abs(nodePos.y - goalPos.y) / 50;
}

// Utility function for delays in animations
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize D3 visualization
function initializeVisualization() {
    const container = d3.select('#graph-container');
    const width = 800;
    const height = 900;

    svg = container
        .attr('width', width)
        .attr('height', height);

    // Clear any existing content
    svg.selectAll('*').remove();

    // Create edges
    const edges = [];
    Object.keys(houseGraph.adjacencyList).forEach(source => {
        houseGraph.adjacencyList[source].forEach(target => {
            edges.push({ source, target });
        });
    });

    // Draw floor labels
    svg.append('text')
        .attr('class', 'floor-label')
        .attr('x', width / 2)
        .attr('y', 80)
        .text('1st Floor');

    svg.append('text')
        .attr('class', 'floor-label')
        .attr('x', width / 2)
        .attr('y', 420)
        .text('2nd Floor');

    // Add a background for better visibility
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#fafafa')
        .attr('stroke', 'none');

    // Draw edges
    svg.selectAll('.edge')
        .data(edges)
        .enter()
        .append('line')
        .attr('class', 'edge')
        .attr('x1', d => houseGraph.nodes[d.source].x)
        .attr('y1', d => houseGraph.nodes[d.source].y)
        .attr('x2', d => houseGraph.nodes[d.target].x)
        .attr('y2', d => houseGraph.nodes[d.target].y);

    // Draw nodes
    svg.selectAll('.node')
        .data(Object.keys(houseGraph.nodes))
        .enter()
        .append('circle')
        .attr('class', 'node default')
        .attr('r', 30)
        .attr('cx', d => houseGraph.nodes[d].x)
        .attr('cy', d => houseGraph.nodes[d].y)
        .attr('id', d => `node-${d}`);

    // Add node labels
    svg.selectAll('.node-label')
        .data(Object.keys(houseGraph.nodes))
        .enter()
        .append('text')
        .attr('class', 'node-label')
        .attr('x', d => houseGraph.nodes[d].x)
        .attr('y', d => houseGraph.nodes[d].y)
        .text(d => d);
}

// Update node visualization
function updateNode(nodeId, className) {
    d3.select(`#node-${nodeId}`)
        .attr('class', `node ${className}`);
}

// Update status information
function updateStatus(message, algorithmInfo = '') {
    document.getElementById('status-info').textContent = message;
    document.getElementById('algorithm-info').textContent = algorithmInfo;
}

// Breadth-First Search
async function breadthFirstSearch(start, goal) {
    updateStatus('Running Breadth-First Search...', 'Explores nodes level by level');
    
    const queue = [start];
    const visited = new Set();
    const parent = {};
    
    while (queue.length > 0 && !currentSearch?.cancelled) {
        const current = queue.shift();
        
        if (visited.has(current)) continue;
        
        visited.add(current);
        updateNode(current, 'visiting');
        await delay(800);
        
        if (current === goal) {
            updateNode(current, 'found');
            await highlightPath(parent, start, goal);
            updateStatus('Goal found!', 'Path highlighted in green');
            return;
        }
        
        updateNode(current, 'visited');
        
        for (const neighbor of houseGraph.adjacencyList[current] || []) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                if (!(neighbor in parent)) {
                    parent[neighbor] = current;
                }
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Depth-First Search
async function depthFirstSearch(start, goal) {
    updateStatus('Running Depth-First Search...', 'Explores as far as possible along each branch');
    
    const stack = [start];
    const visited = new Set();
    const parent = {};
    
    while (stack.length > 0 && !currentSearch?.cancelled) {
        const current = stack.pop();
        
        if (visited.has(current)) continue;
        
        visited.add(current);
        updateNode(current, 'visiting');
        await delay(800);
        
        if (current === goal) {
            updateNode(current, 'found');
            await highlightPath(parent, start, goal);
            updateStatus('Goal found!', 'Path highlighted in green');
            return;
        }
        
        updateNode(current, 'visited');
        
        const neighbors = [...(houseGraph.adjacencyList[current] || [])].reverse();
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
                if (!(neighbor in parent)) {
                    parent[neighbor] = current;
                }
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Depth-Limited Search
async function depthLimitedSearch(start, goal, limit = 3) {
    updateStatus(`Running Depth-Limited Search (limit: ${limit})...`, 'DFS with depth limit');
    
    const visited = new Set();
    const parent = {};
    
    async function dls(node, currentDepth) {
        if (currentDepth > limit || currentSearch?.cancelled) return false;
        
        visited.add(node);
        updateNode(node, 'visiting');
        await delay(800);
        
        if (node === goal) {
            updateNode(node, 'found');
            await highlightPath(parent, start, goal);
            updateStatus('Goal found!', 'Path highlighted in green');
            return true;
        }
        
        updateNode(node, 'visited');
        
        for (const neighbor of houseGraph.adjacencyList[node] || []) {
            if (!visited.has(neighbor)) {
                parent[neighbor] = node;
                if (await dls(neighbor, currentDepth + 1)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    const found = await dls(start, 0);
    if (!found) {
        updateStatus('Search completed - Goal not found within depth limit', '');
    }
}

// Iterative Deepening Search
async function iterativeDeepeningSearch(start, goal) {
    updateStatus('Running Iterative Deepening Search...', 'Combines DFS with BFS benefits');
    
    for (let depth = 0; depth <= 10 && !currentSearch?.cancelled; depth++) {
        updateStatus(`Iterative Deepening - Depth ${depth}...`, `Current depth limit: ${depth}`);
        
        const visited = new Set();
        const parent = {};
        
        async function ids(node, currentDepth) {
            if (currentDepth > depth || currentSearch?.cancelled) return false;
            
            visited.add(node);
            updateNode(node, 'visiting');
            await delay(600);
            
            if (node === goal) {
                updateNode(node, 'found');
                await highlightPath(parent, start, goal);
                updateStatus('Goal found!', 'Path highlighted in green');
                return true;
            }
            
            updateNode(node, 'visited');
            
            for (const neighbor of houseGraph.adjacencyList[node] || []) {
                if (!visited.has(neighbor)) {
                    parent[neighbor] = node;
                    if (await ids(neighbor, currentDepth + 1)) {
                        return true;
                    }
                }
            }
            
            return false;
        }
        
        // Reset visualization for next depth
        if (depth > 0) {
            Object.keys(houseGraph.nodes).forEach(node => {
                if (node !== goal) updateNode(node, 'default');
            });
        }
        
        if (await ids(start, 0)) {
            return;
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Uniform Cost Search
async function uniformCostSearch(start, goal) {
    updateStatus('Running Uniform Cost Search...', 'Explores lowest cost path first');
    
    const frontier = [{ node: start, cost: 0, path: [start] }];
    const visited = new Set();
    
    while (frontier.length > 0 && !currentSearch?.cancelled) {
        // Sort by cost (priority queue simulation)
        frontier.sort((a, b) => a.cost - b.cost);
        const current = frontier.shift();
        
        if (visited.has(current.node)) continue;
        
        visited.add(current.node);
        updateNode(current.node, 'visiting');
        await delay(800);
        
        if (current.node === goal) {
            updateNode(current.node, 'found');
            await highlightPathArray(current.path);
            updateStatus('Goal found!', `Cost: ${current.cost}`);
            return;
        }
        
        updateNode(current.node, 'visited');
        
        for (const neighbor of houseGraph.adjacencyList[current.node] || []) {
            if (!visited.has(neighbor)) {
                const newCost = current.cost + 1; // All edges have cost 1
                const newPath = [...current.path, neighbor];
                frontier.push({ node: neighbor, cost: newCost, path: newPath });
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Bidirectional Search
async function bidirectionalSearch(start, goal) {
    updateStatus('Running Bidirectional Search...', 'Searches from both start and goal');
    
    const frontQueue = [start];
    const backQueue = [goal];
    const frontVisited = new Set([start]);
    const backVisited = new Set([goal]);
    const frontParent = {};
    const backParent = {};
    
    while ((frontQueue.length > 0 || backQueue.length > 0) && !currentSearch?.cancelled) {
        // Expand from front
        if (frontQueue.length > 0) {
            const current = frontQueue.shift();
            updateNode(current, 'visiting');
            await delay(600);
            
            // Check if we've met in the middle
            if (backVisited.has(current)) {
                updateNode(current, 'found');
                await highlightBidirectionalPath(frontParent, backParent, start, goal, current);
                updateStatus('Goal found! Paths met in the middle', 'Meeting point highlighted');
                return;
            }
            
            updateNode(current, 'visited');
            
            for (const neighbor of houseGraph.adjacencyList[current] || []) {
                if (!frontVisited.has(neighbor)) {
                    frontVisited.add(neighbor);
                    frontParent[neighbor] = current;
                    frontQueue.push(neighbor);
                }
            }
        }
        
        // Expand from back
        if (backQueue.length > 0) {
            const current = backQueue.shift();
            updateNode(current, 'visiting');
            await delay(600);
            
            // Check if we've met in the middle
            if (frontVisited.has(current)) {
                updateNode(current, 'found');
                await highlightBidirectionalPath(frontParent, backParent, start, goal, current);
                updateStatus('Goal found! Paths met in the middle', 'Meeting point highlighted');
                return;
            }
            
            updateNode(current, 'visited');
            
            for (const neighbor of houseGraph.adjacencyList[current] || []) {
                if (!backVisited.has(neighbor)) {
                    backVisited.add(neighbor);
                    backParent[neighbor] = current;
                    backQueue.push(neighbor);
                }
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// A* Search
async function aStarSearch(start, goal) {
    updateStatus('Running A* Search...', 'Uses heuristic to guide search optimally');
    
    const openSet = [{ node: start, gScore: 0, fScore: heuristic(start, goal), path: [start] }];
    const visited = new Set();
    
    while (openSet.length > 0 && !currentSearch?.cancelled) {
        // Sort by fScore (priority queue simulation)
        openSet.sort((a, b) => a.fScore - b.fScore);
        const current = openSet.shift();
        
        if (visited.has(current.node)) continue;
        
        visited.add(current.node);
        updateNode(current.node, 'visiting');
        await delay(800);
        
        if (current.node === goal) {
            updateNode(current.node, 'found');
            await highlightPathArray(current.path);
            updateStatus('Goal found!', `Cost: ${current.gScore}, Steps: ${current.path.length - 1}`);
            return;
        }
        
        updateNode(current.node, 'visited');
        
        for (const neighbor of houseGraph.adjacencyList[current.node] || []) {
            if (!visited.has(neighbor)) {
                const tentativeGScore = current.gScore + 1;
                const fScore = tentativeGScore + heuristic(neighbor, goal);
                const newPath = [...current.path, neighbor];
                
                openSet.push({
                    node: neighbor,
                    gScore: tentativeGScore,
                    fScore: fScore,
                    path: newPath
                });
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Greedy Best-First Search
async function greedyBestFirstSearch(start, goal) {
    updateStatus('Running Greedy Best-First Search...', 'Always chooses the node closest to goal');
    
    const openSet = [{ node: start, hScore: heuristic(start, goal), path: [start] }];
    const visited = new Set();
    
    while (openSet.length > 0 && !currentSearch?.cancelled) {
        // Sort by heuristic score
        openSet.sort((a, b) => a.hScore - b.hScore);
        const current = openSet.shift();
        
        if (visited.has(current.node)) continue;
        
        visited.add(current.node);
        updateNode(current.node, 'visiting');
        await delay(800);
        
        if (current.node === goal) {
            updateNode(current.node, 'found');
            await highlightPathArray(current.path);
            updateStatus('Goal found!', `Steps: ${current.path.length - 1}`);
            return;
        }
        
        updateNode(current.node, 'visited');
        
        for (const neighbor of houseGraph.adjacencyList[current.node] || []) {
            if (!visited.has(neighbor)) {
                const hScore = heuristic(neighbor, goal);
                const newPath = [...current.path, neighbor];
                
                openSet.push({
                    node: neighbor,
                    hScore: hScore,
                    path: newPath
                });
            }
        }
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Iterative Deepening A* (IDA*)
async function idaStarSearch(start, goal) {
    updateStatus('Running IDA* Search...', 'Memory-efficient A* with iterative deepening');
    
    let threshold = heuristic(start, goal);
    
    while (!currentSearch?.cancelled) {
        updateStatus(`IDA* - Threshold: ${threshold.toFixed(1)}...`, `Current f-cost limit: ${threshold.toFixed(1)}`);
        
        const visited = new Set();
        const path = [start];
        
        async function search(node, gScore, threshold) {
            const fScore = gScore + heuristic(node, goal);
            
            if (fScore > threshold) return fScore;
            
            if (heuristic(node, goal) === 0) {
                updateNode(node, 'found');
                await highlightPathArray(path);
                updateStatus('Goal found!', `Final threshold: ${threshold.toFixed(1)}`);
                return -1; // Found
            }
            
            visited.add(node);
            updateNode(node, 'visiting');
            await delay(600);
            
            let min = Infinity;
            
            for (const neighbor of houseGraph.adjacencyList[node] || []) {
                if (!visited.has(neighbor)) {
                    path.push(neighbor);
                    const result = await search(neighbor, gScore + 1, threshold);
                    path.pop();
                    
                    if (result === -1) return -1; // Found
                    if (result < min) min = result;
                }
            }
            
            updateNode(node, 'visited');
            visited.delete(node);
            
            return min;
        }
        
        // Reset visualization for next threshold
        Object.keys(houseGraph.nodes).forEach(node => {
            if (node !== goal) updateNode(node, 'default');
        });
        
        const result = await search(start, 0, threshold);
        
        if (result === -1) return; // Found
        if (result === Infinity) break; // No solution
        
        threshold = result;
    }
    
    updateStatus('Search completed - Goal not found', '');
}

// Path highlighting functions
async function highlightPath(parent, start, goal) {
    const path = [];
    let current = goal;
    
    while (current !== start) {
        path.unshift(current);
        current = parent[current];
        if (!current) break;
    }
    path.unshift(start);
    
    await highlightPathArray(path);
}

async function highlightPathArray(path) {
    for (let i = 0; i < path.length; i++) {
        updateNode(path[i], 'path');
        await delay(300);
    }
}

async function highlightBidirectionalPath(frontParent, backParent, start, goal, meeting) {
    // Build front path
    const frontPath = [];
    let current = meeting;
    while (current !== start) {
        frontPath.unshift(current);
        current = frontParent[current];
        if (!current) break;
    }
    frontPath.unshift(start);
    
    // Build back path
    const backPath = [];
    current = meeting;
    while (current !== goal) {
        backPath.push(current);
        current = backParent[current];
        if (!current) break;
    }
    backPath.push(goal);
    
    // Combine paths
    const fullPath = [...frontPath, ...backPath.slice(1)];
    await highlightPathArray(fullPath);
}

// Reset visualization
function resetVisualization() {
    if (currentSearch) {
        currentSearch.cancelled = true;
        currentSearch = null;
    }
    
    isSearching = false;
    document.getElementById('start-search').disabled = false;
    
    // Reset all nodes to default state
    Object.keys(houseGraph.nodes).forEach(nodeId => {
        updateNode(nodeId, 'default');
    });
    
    // Reset all edges
    d3.selectAll('.edge').attr('class', 'edge');
    
    updateStatus('Ready to search', '');
}

// Algorithm mapping
const algorithms = {
    'breadth-first': breadthFirstSearch,
    'depth-first': depthFirstSearch,
    'depth-limited': depthLimitedSearch,
    'iterative-deepening': iterativeDeepeningSearch,
    'uniform-cost': uniformCostSearch,
    'bidirectional': bidirectionalSearch,
    'astar': aStarSearch,
    'greedy': greedyBestFirstSearch,
    'ida-star': idaStarSearch
};

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeVisualization();
    
    // Start search button
    document.getElementById('start-search').addEventListener('click', async function() {
        if (isSearching) return;
        
        const algorithm = document.getElementById('algorithm-select').value;
        const startRoom = document.getElementById('start-room').value;
        const goalRoom = document.getElementById('goal-room').value;
        
        if (startRoom === goalRoom) {
            updateStatus('Start and goal rooms cannot be the same!', '');
            return;
        }
        
        resetVisualization();
        isSearching = true;
        this.disabled = true;
        
        currentSearch = { cancelled: false };
        
        try {
            await algorithms[algorithm](startRoom, goalRoom);
        } catch (error) {
            console.error('Search error:', error);
            updateStatus('Search error occurred', error.message);
        }
        
        isSearching = false;
        this.disabled = false;
    });
    
    // Reset button
    document.getElementById('reset').addEventListener('click', function() {
        resetVisualization();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        initializeVisualization();
    });
});