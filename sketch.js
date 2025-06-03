// 🌾 Mini Game - Festejando a Conexão Campo-Cidade
// Feito em p5.js

// Variáveis dos elementos
let personagem, casa, horta, caminhao;
let estado = "fazenda";
let morangoCrescido = false;
let morangoColhido = false;

// Imagens
let imgPersonagem, imgCasa, imgMorangoPequeno, imgMorangoGrande, imgCaminhao;

function preload() {
  imgPersonagem = loadImage('personagem.png');
  imgCasa = loadImage('casa.png');
  imgMorangoPequeno = loadImage('morango_pequeno.png');
  imgMorangoGrande = loadImage('morango_grande.png');
  imgCaminhao = loadImage('caminhao.png');
}

function setup() {
  createCanvas(800, 400);

  // Posições dos objetos
  personagem = createVector(120, 280);
  casa = createVector(120, 280);
  horta = createVector(400, 220);
  caminhao = createVector(650, 280);
}

function draw() {
  background(150, 200, 255); // Céu

  if (estado === "fazenda") {
    desenharFazenda();
    movimentar();
  } else if (estado === "caminhao") {
    desenharTransporte();
  } else if (estado === "cidade") {
    desenharCidade();
  }
}

// 🎨 Desenha a fazenda
function desenharFazenda() {
  // Grama
  fill(100, 200, 100);
  rect(0, 300, width, 100);

  // Casa
  image(imgCasa, casa.x - 32, casa.y - 32, 64, 64);

  // Horta (terra)
  fill(80, 50, 20);
  rect(horta.x - 20, horta.y, 40, 20);

  // Morango - estados
  if (!morangoCrescido) {
    image(imgMorangoPequeno, horta.x - 8, horta.y - 16, 16, 16);
  } else if (!morangoColhido) {
    image(imgMorangoGrande, horta.x - 8, horta.y - 16, 16, 16);
  }

  // Caminhão
  image(imgCaminhao, caminhao.x - 32, caminhao.y - 16, 64, 32);

  // Personagem
  image(imgPersonagem, personagem.x - 16, personagem.y - 32, 32, 32);
}

// 🚛 Transporte do caminhão
function desenharTransporte() {
  background(200, 230, 255);

  // Estrada
  fill(100);
  rect(0, 300, width, 100);

  // Move caminhão
  caminhao.x -= 3;

  // Desenha caminhão
  image(imgCaminhao, caminhao.x - 32, caminhao.y - 16, 64, 32);

  // Chega na cidade
  if (caminhao.x <= 50) {
    estado = "cidade";
  }
}

// 🏙️ Desenha a cidade
function desenharCidade() {
  background(180, 220, 255);

  // Rua
  fill(180);
  rect(0, 300, width, 100);

  // Prédios
  fill(120, 120, 150);
  rect(100, 150, 80, 150);
  rect(220, 100, 60, 200);
  rect(320, 170, 100, 130);
  rect(450, 120, 70, 180);
  rect(550, 160, 80, 140);

  // Texto
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Você levou os morangos para a cidade!", width / 2, 60);
  text("Parabéns! 🌾🚚🏙️", width / 2, 100);
}

// 🎮 Movimentação do personagem
function movimentar() {
  if (keyIsDown(LEFT_ARROW)) {
    personagem.x -= 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.x += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    personagem.y -= 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    personagem.y += 2;
  }

  // Limites da tela
  personagem.x = constrain(personagem.x, 0, width);
  personagem.y = constrain(personagem.y, 0, 300);
}

// 🎯 Ações ao apertar espaço
function keyPressed() {
  if (key === ' ') {
    // Interagir com a horta
    if (dist(personagem.x, personagem.y, horta.x, horta.y) < 40) {
      if (!morangoCrescido) {
        morangoCrescido = true; // Rega
      } else if (morangoCrescido && !morangoColhido) {
        morangoColhido = true; // Colhe
      }
    }

    // Ir para o caminhão
    if (dist(personagem.x, personagem.y, caminhao.x, caminhao.y) < 60) {
      if (morangoColhido) {
        estado = "caminhao";
      }
    }
  }
}
