import MovingDirection from "./MovingDirection.js";

export default class Pacman {
constructor(x,y,size,velocity,tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = size;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimationTimer = null;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.#loadPacmanImages();
    document.addEventListener("keydown", this.#keydown)

}
draw(ctx){
    this.#animate();
    this.#move();
    ctx.drawImage(this.pacmanImages[this.pacmanImageIndex],
        this.x, 
        this.y, 
        this.tileSize,
        this.tileSize);
}


//repeticao da imagem pac1 pra fazer o loop de abrir e fechar a boca
#loadPacmanImages(){
    const pacmanImage1 = new Image();
    pacmanImage1.src = "./images/pac0.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "./images/pac1.png";
    
    const pacmanImage3 = new Image();
    pacmanImage3.src = "./images/pac2.png";

    const pacmanImage4 = new Image();
    pacmanImage4.src = "./images/pac1.png";

    this.pacmanImages = [pacmanImage1,pacmanImage2, pacmanImage3,pacmanImage4];
    this.pacmanImageIndex = 1;


}

#keydown = (event)=> {
//up
if (event.keyCode == 38) {
    if (this.currentMovingDirection == MovingDirection.down)
      this.currentMovingDirection = MovingDirection.up;
    this.requestedMovingDirection = MovingDirection.up;
    //this.madeFirstMove = true;
  }
  //down
  if (event.keyCode == 40) {
    if (this.currentMovingDirection == MovingDirection.up)
      this.currentMovingDirection = MovingDirection.down;
    this.requestedMovingDirection = MovingDirection.down;
   // this.madeFirstMove = true;
  }
  //left
  if (event.keyCode == 37) {
    if (this.currentMovingDirection == MovingDirection.right)
      this.currentMovingDirection = MovingDirection.left;
    this.requestedMovingDirection = MovingDirection.left;
   // this.madeFirstMove = true;
  }
  //right
  if (event.keyCode == 39) {
    if (this.currentMovingDirection == MovingDirection.left)
      this.currentMovingDirection = MovingDirection.right;
    this.requestedMovingDirection = MovingDirection.right;
   // this.madeFirstMove = true;
  }
}
#move(){
    if(this.currentMovingDirection !== this.requestedMovingDirection){
        if (
            Number.isInteger(this.x / this.tileSize) &&
            Number.isInteger(this.y / this.tileSize)){
                if (
                    !this.tileMap.didCollideWithEnvironment(
                      this.x,
                      this.y,
                      this.requestedMovingDirection
                    )
                  )
            this.currentMovingDirection = this.requestedMovingDirection;
          }
    }
    if (
        this.tileMap.didCollideWithEnvironment(
          this.x,
          this.y,
          this.currentMovingDirection
        ))
        {   this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 1;
            return; }
        else if(this.currentMovingDirection != null &&
            this.pacmanAnimationTimer == null
          ) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
          }

    switch(this.currentMovingDirection){
        case MovingDirection.up:
        this.y -= this.velocity;
        break;
        case MovingDirection.down:
        this.y += this.velocity;
        break;
        case MovingDirection.left:
        this.x -= this.velocity;
        break;
        case MovingDirection.right:
        this.x += this.velocity;
        break;

    }


}
//loop da imagem da boca do pacman
//se o timer for null nao faz nada se for != de 0, decrementa o contador ate ser = 0

#animate(){
    if (this.pacmanAnimationTimer == null) {
        return;
      }
      this.pacmanAnimationTimer--;
      if (this.pacmanAnimationTimer == 0) {
        this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        this.pacmanImageIndex++; //icrementa a lista de imagens, vamos para a imagem seguinte do array
        if (this.pacmanImageIndex == this.pacmanImages.length)
          this.pacmanImageIndex = 0; //recomeça a imagem inicial
      }
}







}

