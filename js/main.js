const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#ff0'; 

class Circle{
    constructor(x, y, radius, color, text, speed){
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;

        this.speed = speed;

        this.dx = 3 * this.speed;
        this.dy = 3 * this.speed;
    }

    draw(){
        ctx.beginPath();

        ctx.strokeStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "20px Arial";
        ctx.fillText(this.text, this.posX, this.posY);

        ctx.lineWidth = 8;
        ctx.arc(this.posX, this.posY, this.radius,  0 , Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    }

    update(){
        this.draw();

        //Si el círculo supera el margen derecho entonces se mueve a la izquierda
        if((this.posX + this.radius)>window_width){
            this.dx = -this.dx;
        }

        //Si el círculo supera el margen izquierdo entonces se mueve a la derecha
        if((this.posX - this.radius)<0){
            this.dx = -this.dx;
        }

        //Si el círculo supera el margen superior, se mueve hacia abajo
        if((this.posY - this.radius)<0){
            this.dy = -this.dy;
        }

        //Si el círculo supera el margen inferior se mueve hacia arriba
        if((this.posY + this.radius)>window_height){
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle = [];

// Crear 10 círculos
for(let i = 0; i < 10; i++){
    let randomRadius = Math.floor(Math.random()*100 + 30);
    let randomX = Math.random() * (window_width - 2 * randomRadius)+ randomRadius;
    let randomY = Math.random() * (window_height - 2 * randomRadius)+ randomRadius;
    
    

    let miCirculo = new Circle(randomX , randomY, randomRadius, 'blue', i + 1, 1);
    // Agregar el objeto al array
    arrayCircle.push(miCirculo);
}

let updateCircles = function(){
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);

    // Iterar sobre cada círculo en el array y actualizar su posición
    for(let i = 0; i < arrayCircle.length; i++){
        arrayCircle[i].update();
    }
};

updateCircles();

