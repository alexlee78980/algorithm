import React, { useEffect, useState } from "react";
import Block from "./PathComponents/Block";
import classes from './PathVisualizer.module.css';
import { Node } from './PathComponents/Node.js';
import { getBFSAnimation} from "../algorithms/Pathfinding";
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 210;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const PathVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [selected, setSelected] = useState('wall');
    useEffect(() => {
        setGrid([]);
        for (let h = 0; h < 15; h++) {
            const newRow = [];
            for (let w = 0; w < 43; w++) {
                newRow.push(new Node(w, h));
            }
            setGrid((prev) => [...prev, newRow]);
        }
    }, []);

    const eraseAllHandler = () => {
        setGrid((prev) => (prev.map((row) => {
            return row.map((node) => {
                node.setWall(false);
                return node;
            })
        })));
    };

    const BFSHandler = () => {
        const { animations, animationsPath } = getBFSAnimation(grid);
        const fullanimation = [...animations, ...animationsPath];
        for (let i = 0; i < animations.length + animationsPath.length; i++) {
            if (i < animations.length ) {
                const arrayBars = document.getElementsByClassName(classes.block);
                const isColorChange = i % 2 !== 2;
                if (isColorChange) {
                    const [x, y] = fullanimation[i];
                    const block = arrayBars[x + 43 * y].style;
                    const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                        block.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS);
                }
            }else{
                console.log("ran");
                const arrayBars = document.getElementsByClassName(classes.block);
                const isColorChange = i % 2 !== 2;
                if (isColorChange) {
                    const [x, y] = fullanimation[i];
                    const block = arrayBars[x + 43 * y].style;
                    const color = i % 2 === 0 ? 'red' : 'pink';
                    setTimeout(() => {
                        block.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS);
                }
            }
        };
    }
    const pathAnimation = (animationsPath) => {
        for (let i = 0; i < animationsPath.length; i++) {
            const arrayBars = document.getElementsByClassName(classes.block);
            const isColorChange = i % 2 !== 2;
            if (isColorChange) {
                const [x, y] = animationsPath[i];
                const block = arrayBars[x + 43 * y].style;
                const color = i % 2 === 0 ? 'red' : 'pink';
                setTimeout(() => {
                    block.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
        };
    }

    // const DFSHandler = () =>{
    //     const { animations, animationsPath } = getDFSAnimation(grid);
    //     const fullanimation = [...animations, ...animationsPath];
    //     for (let i = 0; i < animations.length + animationsPath.length; i++) {
    //         if (i < animations.length ) {
    //             const arrayBars = document.getElementsByClassName(classes.block);
    //             const isColorChange = i % 2 !== 2;
    //             if (isColorChange) {
    //                 const [x, y] = fullanimation[i];
    //                 const block = arrayBars[x + 43 * y].style;
    //                 const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //                 setTimeout(() => {
    //                     block.backgroundColor = color;
    //                 }, i * ANIMATION_SPEED_MS);
    //             }
    //         }else{
    //             console.log("ran");
    //             const arrayBars = document.getElementsByClassName(classes.block);
    //             const isColorChange = i % 2 !== 2;
    //             if (isColorChange) {
    //                 const [x, y] = fullanimation[i];
    //                 const block = arrayBars[x + 43 * y].style;
    //                 const color = i % 2 === 0 ? 'red' : 'pink';
    //                 setTimeout(() => {
    //                     block.backgroundColor = color;
    //                 }, i * ANIMATION_SPEED_MS);
    //             }
    //         }
    //     };
    // }

    const wallHandler = () => {
        setSelected('wall');
    };
    const eraseHandler = () => {
        setSelected('erase');
    }
    const targetHandler = () => {
        setSelected('target');
    };

    const startHandler = () => {
        setSelected('start');
    };
    const reloadGrid = () => {
        setGrid((prev) => ([...prev]))
    };

    return <div className={classes.grid}>
        {grid.map((row, idx) => { return <div> {row.map((node, idy) => (<Block className={classes.block} reload={reloadGrid} selected={selected} key={[idx, idy]} keys={[idx, idy]} node={node}></Block>))} </div> })}
        <div><button onClick={wallHandler}>Wall</button>
            <button onClick={eraseHandler}>Erase</button>
            <button onClick={startHandler}>Set Start</button>
            <button onClick={targetHandler}>Set Target</button>
            <button onClick={eraseAllHandler}>Erase All Walls</button>
            <button onClick={BFSHandler}>BFS</button>
        </div>
    </div>
};

export default PathVisualizer;