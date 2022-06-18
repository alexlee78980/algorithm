import classes from './Block.module.css';
import {Node} from './Node.js';
import { useEffect, useState } from 'react';
const Block = (props) => {
    const[clicked, setClicked] =useState(false);
    useEffect(()=>{
        if(props.node.wall){
            setClicked(true)
        }else{
            setClicked(false)
        }
    },[props.node.wall])
    const clickedHandler = () => {
        if(props.selected === 'wall' && !(Node.tar === props.node) && !(Node.start === props.node)){
            console.log(props.keys);
            props.node.setWall(true);
            setClicked(true);
        }else if(props.selected === 'erase'){
            props.node.setWall(false);
            setClicked(false);
        }else if (props.selected === 'target'){
            console.log('target');
            if (!props.node.wall && !(Node.start === props.node)){
                Node.setTarget(props.node);
                props.reload();
            }
        }else if (props.selected === 'start'){
            if (!props.node.wall && !(Node.tar === props.node)){
                Node.setStart(props.node);
                props.reload();
            }
        }
    };
    const className = `${classes.node} ${clicked ? classes.clicked: ''} ${(Node.tar === props.node ? classes.target : '')} ${(Node.start=== props.node ? classes.start : '')}`;
    return <div onDragEnter={clickedHandler} onMouseDown={clickedHandler} className={`${className} ${props.className}`}>
        {props.children}
    </div>
}

export default Block