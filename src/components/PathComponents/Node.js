export class Node {

    static tar = null;
    static start = null;
    constructor(w, h){
        this.wall = false;
        this.width = w;
        this.height = h;
        this.distance = Infinity;
        this.value = 1;
    }
    setWall = (wall) => {
        this.wall = wall;
        console.log("clicked");
    };
    static setTarget = (node) => {
        this.tar = node;
    };
    static setStart = (node) => {
        this.start = node;
    };
}