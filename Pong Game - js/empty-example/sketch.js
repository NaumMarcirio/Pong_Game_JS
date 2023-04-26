// variaveis bola
let valorXBola = 380;
let valorYBola = 300;
let valorDiametroBola = 25;
let raioBolinha = valorDiametroBola / 2;  // variavel usada para a bola não colidir no centro da bola e sim na borda

//variaveis velocidade da bola
let velocidadeXBola = 11;
let velocidadeYBola = 11;

//variaveis globais raquete
 
let larguraRaquete = 10;
let alturaRaquete = 100;
let colidiu = false;

//variaveis raquete usuario

let valorXRaqueteUsuario = 20;
let valorYRaqueteUsuario = 250;

//variaveis raquete maquina

let valorXRaqueteMaquina = 770;
let valorYRaqueteMaquina = 250;
let velocidadeRaqueteMaquina;
let chanceMaquinaErrar = 0;

//variaveis placar

let pontosUsuario = 0;
let pontosMaquina = 0;

// variaveis sons

let somRaquete;
let somMarcarPonto;

function preload(){
  somMarcarPonto = loadSound("ponto.mp3")
  somRaquete = loadSound("raquetada.mp3")
}


function setup() {
  createCanvas(800,600);  // tamanho da tela
}


function draw() {
  background(color((230, 235, 234)));   // cor de fundo
  mostraBola();
  velocidadeBola();
  verificaColisao();
  mostraRaquete(valorXRaqueteUsuario,valorYRaqueteUsuario);
  mostraRaquete(valorXRaqueteMaquina,valorYRaqueteMaquina);
  movimentoRaqueteUsuario();
  verificaColisaoRaquete(valorXRaqueteUsuario,valorYRaqueteUsuario);
  verificaColisaoRaquete(valorXRaqueteMaquina,valorYRaqueteMaquina);
  movimentoRaqueteMaquina();
  mostraPlacar();
  marcaPontos();
  
}

function mostraBola(){
  fill(color(0, 166, 146))
  circle(valorXBola,valorYBola,valorDiametroBola);   // cria um circulo, com os parametros = largura,altura e diametro
}

function velocidadeBola(){
  valorXBola += velocidadeXBola;  //adiciona movimento a bola
  valorYBola += velocidadeYBola;
}

function verificaColisao(){
  if (valorXBola + raioBolinha > width || valorXBola - raioBolinha < 0){    // sobre o eixo X da bola
    velocidadeXBola *= -1;
  }
  
  if (valorYBola + raioBolinha > height || valorYBola - raioBolinha < 0){   // sobre o eixo Y da bola
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x,y){
  fill(color(0, 89, 79))
  rect(x,y,larguraRaquete,alturaRaquete);
}

function movimentoRaqueteUsuario(){
  if (keyIsDown(UP_ARROW)){
    valorYRaqueteUsuario -= 17
  }

  if (keyIsDown(DOWN_ARROW)){
    valorYRaqueteUsuario += 17
  }
}

function movimentoRaqueteMaquina(){

  velocidadeRaqueteMaquina = valorYBola - valorYRaqueteMaquina - larguraRaquete/2 - 30
  valorYRaqueteMaquina += velocidadeRaqueteMaquina + chanceMaquinaErrar;
  chanceDeErrar();

}

function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,larguraRaquete,alturaRaquete,valorXBola,valorYBola,raioBolinha);
  if (colidiu){
    velocidadeXBola *= -1;
    somRaquete.play();
  }
  
}

function mostraPlacar(){
  textAlign(CENTER);
  textSize(30)
  fill(color(0, 89, 79));
  text(pontosUsuario,330,40);
  text(pontosMaquina,460,40);

  
}


function marcaPontos(){
  if(valorXBola < 12){
    pontosMaquina += 1;
    somMarcarPonto.play();
    
    
  }
  if(valorXBola > 788){
    pontosUsuario += 1;
    somMarcarPonto.play();
    
    
    
  }
}

function chanceDeErrar(){
  if(pontosUsuario <= pontosMaquina){
    chanceMaquinaErrar += 1;
    if(chanceMaquinaErrar>= 1){
      chanceMaquinaErrar = 1;
    }
    else{
      chanceMaquinaErrar -= 1;
    }
    if(chanceMaquinaErrar <= 35){
      chanceMaquinaErrar = 35;
    }
  }
}







