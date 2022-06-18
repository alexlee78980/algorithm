import { Node } from "../components/PathComponents/Node";
import { Queue } from "../dataStructures/Queue";
import Stack from "../dataStructures/Stack";
// export const getDijkstraAnimation = (graph) =>{
//     const animation = [];
//     DijkstraAlgorithm(graph, Node.tar, Node.start, animation)
// };

export const getBFSAnimation = (graph) => {
    const animations = [];
    const animationsPath = [];
    BFSAlgorithm(graph, Node.tar, Node.start, animations, animationsPath);
    return {animations, animationsPath};
};

const BFSAlgorithm = (graph, target, start, animation, animationpath) => {
    const prev = solveBFS(graph, start, target, animation);
    reconstructPath(start,target, prev, animationpath)
    return;
};

const reconstructPath = (start, target, prev, animationpath) =>{
    const path = []
    let next = [target.width, target.height]
    while(next){
        console.log(next);
        console.log(prev);
        console.log(prev[next[1]]);
        next = prev[next[1]][next[0]];
        path.push(next);
    }
    path.reverse();

    if(path.length > 1 && path[1][0] == start.width && path[1][1] == start.height){
        const animatedPath = path.slice(2);
        animatedPath.forEach((node)=>{
            animationpath.push(node);
            animationpath.push(node);
        })

    }else{
        console.log("fail");
    } 
    console.log(animationpath);
};
const solveBFS = (graph, start, target, animation) => {
    let que = new Queue();
    que.enqueue([start.width, start.height]);
    const visited = [];
    const prev = [];
    graph.forEach((item, i) => {
        const row1 = [];
        const row2 = [];
        item.forEach((item, index) => {
            row1.push(null)
            row2.push(null)
        })

        visited.push(row1);
        prev.push(row2);
    
    });
    console.log(start.width);
    console.log(start.height);
    visited[start.height][start.width] = true;
    while (!que.isEmpty()) {
        const node = que.dequeue();
        console.log(target);
        if (node[1] == target.height && node[0] == target.width){
            break;
        }
        const neightbour = [];
        if (node[0] == 0 && node[1] == 0) {
            neightbour.push([node[0] + 1, node[1]]);
            neightbour.push([node[0], node[1] + 1]);
        }
        else if (node[1] == 14 && node[0] == 42) {
            neightbour.push([node[0] - 1, node[1]]);
            neightbour.push([node[0], node[1] - 1]);
        }  else if (node[1] == 0 && node[0] == 42) {
            neightbour.push([node[0] - 1, node[1]]);
            neightbour.push([node[0], node[1] + 1]);
        
        }  else if (node[1] == 14 && node[0] == 0) {
            neightbour.push([node[0] + 1, node[1]]);
            neightbour.push([node[0], node[1] - 1]);
        
        }
        else if (node[0] == 42) {
            neightbour.push([node[0] - 1, node[1]]);
            neightbour.push([node[0], node[1] - 1]);
            neightbour.push([node[0], node[1] + 1]);
        } else if (node[1] == 14) {
            neightbour.push([node[0] - 1, node[1]]);
            neightbour.push([node[0], node[1] - 1]);
            neightbour.push([node[0]+1, node[1]]);
        }
         else if (node[0] == 0) {
            neightbour.push([node[0] + 1, node[1]]);
            neightbour.push([node[0], node[1] + 1]);
            neightbour.push([node[0], node[1] - 1]);
        } else if (node[1] == 0) {
            neightbour.push([node[0] + 1, node[1]]);
            neightbour.push([node[0], node[1] + 1]);
            neightbour.push([node[0] - 1, node[1]]);
        } else {
            neightbour.push([node[0] + 1, node[1]]);
            neightbour.push([node[0], node[1] + 1]);
            neightbour.push([node[0] - 1, node[1]]);
            neightbour.push([node[0], node[1] - 1]);
        }
        neightbour.forEach((next) => {
            if (!visited[next[1]][next[0]] && isNotWallBlock(graph, next[0], next[1])){
                if(Node.tar.width === next[0] && Node.tar.height === next[1]){
                    
                }else{
                    animation.push(next);
                    animation.push(next);
                }
                que.enqueue(next);
                visited[next[1]][next[0]] = true;
                prev[next[1]][next[0]] = node;
            }
        })
    }
    console.log(prev);
    return prev;
}

// export const getDFSAnimation = (graph) =>{
//     const animations = [];
//     const animationsPath = [];    
//     DFSAlgorithm(graph, Node.start, Node.tar,animations, animationsPath); 
//     return {animations, animationsPath};
// };

// const DFSAlgorithm = (graph, start, target, animation, animationPath) => {
//     const prev = solveDFS(graph, start, target,animation);
// };

// const solveDFS = (graph, start, target, animation) => {
//     const stack = new Stack();
//     stack.enqueue([start.width, start.height]);
//     const visited = [];
//     const prev = [];
//     graph.forEach((row)=>{
//         const row1 =  [];
//         const row2 = [];
//         row.forEach((node)=>{
//             row1.push(null);
//             row2.push(null);
//         });
//         visited.push(row1);
//         prev.push(row2);
//     });
//     visited[start.width][start.height] = true;
//     while(!stack.isEmpty()){
//         const node = stack.dequeue();
//         console.log(node);
//         console.log(target.height);
//         console.log(node[1]);
//         console.log(node[0]);
//         console.log(target.width);
//         if (target.height == node[1] && target.width == node[0]){
//             break;
//         }
//         animation.push(node);
//         animation.push(node);
//         const neightbour = [];
//         if (node[0] == 0 && node[1] == 0) {
//             neightbour.push([node[0] + 1, node[1]]);
//             neightbour.push([node[0], node[1] + 1]);
//         }
//         else if (node[1] == 14 && node[0] == 42) {
//             neightbour.push([node[0] - 1, node[1]]);
//             neightbour.push([node[0], node[1] - 1]);
//         }  else if (node[1] == 0 && node[0] == 42) {
//             neightbour.push([node[0] - 1, node[1]]);
//             neightbour.push([node[0], node[1] + 1]);
        
//         }  else if (node[1] == 14 && node[0] == 0) {
//             neightbour.push([node[0] + 1, node[1]]);
//             neightbour.push([node[0], node[1] - 1]);
        
//         }
//         else if (node[0] == 42) {
//             neightbour.push([node[0] - 1, node[1]]);
//             neightbour.push([node[0], node[1] - 1]);
//             neightbour.push([node[0], node[1] + 1]);
//         } else if (node[1] == 14) {
//             neightbour.push([node[0] - 1, node[1]]);
//             neightbour.push([node[0], node[1] - 1]);
//             neightbour.push([node[0]+1, node[1]]);
//         }
//          else if (node[0] == 0) {
//             neightbour.push([node[0] + 1, node[1]]);
//             neightbour.push([node[0], node[1] + 1]);
//             neightbour.push([node[0], node[1] - 1]);
//         } else if (node[1] == 0) {
//             neightbour.push([node[0] + 1, node[1]]);
//             neightbour.push([node[0], node[1] + 1]);
//             neightbour.push([node[0] - 1, node[1]]);
//         } else {
//             neightbour.push([node[0] + 1, node[1]]);
//             neightbour.push([node[0], node[1] + 1]);
//             neightbour.push([node[0] - 1, node[1]]);
//             neightbour.push([node[0], node[1] - 1]);
//         }
//         neightbour.forEach((next) => {
//             if (!visited[next[1]][next[0]] && isNotWallBlock(graph, next[0], next[1])){
//                 if(Node.tar.width === next[0] && Node.tar.height === next[1]){
                    
//                 }else{
//                 }
//                 stack.enqueue(next);
//                 visited[next[1]][next[0]] = true;
//                 prev[next[1]][next[0]] = node;
//             }
//         })
//     };
// };
const isNotWallBlock = (graph, width, height)=> {
    let notWall = true;
    graph.forEach((row) =>{
        row.forEach((node)=>{
            if(node.height == height && node.width == width){
                if(node.wall){
                    console.log(node.wall);
                    notWall = false;
                    return notWall;
                }else{
                    return notWall;
                }
            }
        } );
    });
    return notWall;
};