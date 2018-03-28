let element = 0,
    family = null,
    currentX = 0,
    currentY = 0,
    mousedown = false,
    left = 0,
    top = 700,
    currentMatrix = 0;

export const makeDraggable = (ev) =>{
    family = document.querySelector(".Family");
    console.log(left,top);
    element = ev.target;
    currentX = ev.clientX;
    currentY = ev.clientY;
    currentMatrix = element.getAttributeNS(null, "transform").slice(7,-1).split(' ');

    for(let i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    mousedown = true;
};

export const moveElement = (evt) =>{
    if(mousedown){
        const dx = evt.clientX - currentX;
        const dy = evt.clientY - currentY;
        currentMatrix[4] += dx;
        currentMatrix[5] += dy;
        left += dx;
        top +=  dy;
        family.style.left = left + "px";
        family.style.top = top + "px";
        const newMatrix = "matrix(" + currentMatrix.join(' ') + ")";

        element.setAttributeNS(null, "transform", newMatrix);
        currentX = evt.clientX;
        currentY = evt.clientY;
    }
}

export const stopMoving=(evt) =>{
    mousedown = false;
}