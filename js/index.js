
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const $score = document.querySelector('span')
const $paddle = document.querySelector('#paddle')
const $brick = document.querySelector('#brick')

        canvas.width = 1000
        canvas.height = 1030

        //Radio de la pelota
        const ballRadius = 8

        //Dirección de la pelota
        let x = canvas.width / 2
        let y = canvas.height - 60

        //Velocidad de la pelota
        let dx = -1.8
        let dy = -1.8

        const paddleHeight = 40;
        const paddleWidth = 100;

        let paddleX = (canvas.width - paddleWidth) / 2
        let paddleY = canvas.height - paddleHeight - 10

        let rightPressed = false
        let leftPressed = false

        const brickRowCount = 11
        const brickColumnCount = 13
        const brickWidth = canvas.width / 14
        const brickHeight = canvas.height / 27
        const brickPadding = 2
        const brickOffsetTop = 80
        const brickOffsetLeft = 16
        const bricks = []
        const BRICKS_STATUS = {ACTIVE: 1, DESTROYED: 0}
        const BRICKS_ATRIBUTES = [ {COLOR: '#1a1334', PUNTOS: 1}, 
                                {COLOR: '#26294a', PUNTOS: 2},
                                {COLOR: '#01545a', PUNTOS: 3},
                                {COLOR: '#017351', PUNTOS: 5},
                                {COLOR: '#03c383', PUNTOS: 8},
                                {COLOR: '#aad962', PUNTOS: 10},
                                {COLOR: '#fbbf45', PUNTOS: 12},
                                {COLOR: '#ef6a32', PUNTOS: 15},
                                {COLOR: '#ed0345', PUNTOS: 17},
                                {COLOR: '#a12a5e', PUNTOS: 20},
                                {COLOR: '#710162', PUNTOS: 25},
                                {COLOR: '#110141', PUNTOS: 30}]

        let score = 0
        let winner_score = 0
        
        for (let c = 0; c < brickColumnCount; c++){
            bricks[c] = []
            for(let r = 0; r < brickRowCount; r++){
                const brickX = c *(brickWidth + brickPadding) +
                brickOffsetLeft

                const brickY = r *(brickHeight + brickPadding) +
                brickOffsetTop

                //Asignar un color aleatorio a cada ladrillo
                const random = Math.floor(Math.random() * 11)

                bricks[c][r] = {x: brickX, y: brickY, status:  BRICKS_STATUS.ACTIVE, color: BRICKS_ATRIBUTES[random].COLOR, puntos: BRICKS_ATRIBUTES[random].PUNTOS}
                winner_score += BRICKS_ATRIBUTES[random].PUNTOS
            }
        }

        const PADDLE_SENSIBILITY = 4

        //Pintar la pelota
        function drawBall(){
            ctx.beginPath()
            ctx.arc(x, y, ballRadius, 0, Math.PI*2)
            ctx.fillStyle = 'white'
            ctx.fill()
            ctx.closePath()
        }

        function drawPaddle(){
/*
            ctx.strokeStyle= '#efb810'
            ctx.beginPath()
            ctx.roundRect(paddleX, paddleY, paddleWidth, paddleHeight, [10, 10, 10, 10])
            ctx.stroke()*/
            
            ctx.drawImage(
                $paddle, //imagen
                81,     //clipx: coordenadas de recorte
                65,    //clipy: coordenadas de recorte
                138, //tamaño del recorte
                45, //tamaño del recorte
                paddleX, //posición X del dibujo
                paddleY, //posición Y del dibujo
                paddleWidth, //ancho del dibujo
                paddleHeight //alto del dibujo
            )
        } 

        function drawBricks(){
            
            for (let c = 0; c < brickColumnCount; c++){
                for(let r = 0; r < brickRowCount; r++){
                    const currentBrick = bricks[c][r]

                    if(currentBrick.status == BRICKS_STATUS.DESTROYED)
                    continue;
                    
                    ctx.beginPath()
                    ctx.fillStyle = currentBrick.color
                    ctx.rect(
                        currentBrick.x,
                        currentBrick.y,
                        brickWidth,
                        brickHeight
                    )
                    ctx.strokeStyle = '#fff000'
                    ctx.stroke()
                    ctx.fill()
                    ctx.closePath()
                }
            }
            
        }
        
        function collisionDetection(){

            for (let c = 0; c < brickColumnCount; c++){
                for(let r = 0; r < brickRowCount; r++){
                    const currentBrick = bricks[c][r]

                    if(currentBrick.status == BRICKS_STATUS.DESTROYED)
                    continue;

                    const isBallSameXAsBrick =
                        x > currentBrick.x &&
                        x < currentBrick.x + brickWidth

                    const isisBallSameYAsBrick =
                        y > currentBrick.y &&
                        y < currentBrick.y + brickHeight

                    if(isBallSameXAsBrick && isisBallSameYAsBrick){
                        dy = -dy
                        currentBrick.status = BRICKS_STATUS.DESTROYED
                        score = score + currentBrick.puntos
                        
                        if(score == winner_score && score > 0){
                            window.location.href = 'win.html'
                        }
                    }
                }
            }
            console.log(winner_score)
        }

        //Movimiento del Paddle
        function paddleMovement(){
            if(rightPressed && paddleX < canvas.width - paddleWidth){
                paddleX += PADDLE_SENSIBILITY
            }else if(leftPressed && paddleX > 0){
                paddleX -= PADDLE_SENSIBILITY
            }
        }

        //Limpiar las posiciones anteriores en donde se pintó la pelota
        function cleanCanvas(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        function initEvents(){
            document.addEventListener('keydown', keyDownHandler)
            document.addEventListener('keyup', keyUpHandler)

            function keyDownHandler(event){ 
                const { key } = event
                if (key == 'Right' || key == 'ArrowRight'){
                    rightPressed = true
                } else if (key == 'Left' || key == 'ArrowLeft'){
                    leftPressed = true
                }
            }
            function keyUpHandler(event){
                const { key } = event
                if (key == 'Right' || key == 'ArrowRight'){
                    rightPressed = false
                }else if (key == 'Left' || key == 'ArrowLeft'){
                    leftPressed = false
                }
            }
        }

        //Movimientos de la pelota
        function ballMovement(){
            //Rebotar paredes laterales
            if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
               dx = -dx 
            }

            //Rebotar pared de arriba
            if(y + dy < ballRadius){
                dy = -dy
            }

            const isBallSameXAsPaddle = 
                x > paddleX && 
                x < paddleX + paddleWidth
            const isBallTouchingPaddle =
                y + dy > paddleY
            //Cae abajo
            if(isBallSameXAsPaddle && isBallTouchingPaddle){
               dy = -dy 
            } else if(y + dy > canvas.height - ballRadius){
                window.location.href = 'game_over.html'
            }

            x += dx
            y += dy
        }

        function draw(){
            
            cleanCanvas()
            drawBall()
            drawPaddle()
            drawBricks()

            collisionDetection()
            ballMovement()
            paddleMovement()

            $score.innerText = score

            window.requestAnimationFrame(draw)
        }
        
const $section = document.querySelector('section')
$section.addEventListener('click',() => {
    draw()
    initEvents()

    const audio = new window.Audio('./src/neon-gaming.mp3')
    audio.play()
    $section.remove()
})

const $button = document.querySelector('button')
$button.addEventListener('click',() => {
    location.reload()
})
