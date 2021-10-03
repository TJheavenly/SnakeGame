
let snake;
let fruit;
let score;
const size = 30;

// 事前準備
function setup() {
    // キャンバスを用意
    createCanvas(600, 600);
    // ヘビを作成
    snake = new Snake();
    // 果物を作成
    fruit = new Fruit();
    // スコアをリセット
    score = 0;
    // 1秒間に描画する回数を設定
    frameRate(6);
}

// 画面描画
function draw() {
    background('gray');
    // ヘビを表示
    snake.show();
    // 果物を表示
    fruit.show();
    // ヘビを動かす
    snake.move();

    // ヘビが果物を食べたかどうか判定
    if (snake.eat(fruit.body)) {
        fruit.move();
    }

    // ゲーム終了の条件に当てはまるかどうか判定
    if (snake.end()) {
        background('black');
        noLoop();
    }
}

// キーが押下されたときの処理
function keyPressed() {

    if (isInvalidKeyPress(keyCode)){
        return;
    }

    // ↑キー
    if (keyCode === UP_ARROW) {
        snake.changeDirection(0,-1);
        snake.nowKeyCode = UP_ARROW;
        // ↓キー
    } else if (keyCode === DOWN_ARROW) {
        snake.changeDirection(0,1);
        snake.nowKeyCode = DOWN_ARROW;
        // ←キー
    } else if (keyCode === LEFT_ARROW) {
        snake.changeDirection(-1,0);
        snake.nowKeyCode = LEFT_ARROW;
        // →キー
    } else if (keyCode === RIGHT_ARROW) {
        snake.changeDirection(1,0);
        snake.nowKeyCode = RIGHT_ARROW;
    }
}

// ヘビの進行方向と逆方向のキーが押されている場合は操作を無効とする。
function isInvalidKeyPress(keyCode) {
    if (score < 1) {
        return false;
    }

    if (keyCode === UP_ARROW && snake.nowKeyCode === DOWN_ARROW) {
        return true;
    } else if (keyCode === DOWN_ARROW && snake.nowKeyCode === UP_ARROW) {
        return true;
    } else if (keyCode === LEFT_ARROW && snake.nowKeyCode === RIGHT_ARROW) {
        return true;
    } else if (keyCode === RIGHT_ARROW && snake.nowKeyCode === LEFT_ARROW) {
        return true;
    }

    return false;
}

class Snake {
    constructor() {
        this.body = [];
        this.body.push(createVector(0, 0));
        this.xDirection = 1;
        this.yDirection = 0;
        this.nowKeyCode = RIGHT_ARROW;
    }

    // ヘビを表示する。
    show() {
        fill('lime');
        this.body.forEach(body => {
            // ヘビを作成
            rect(body.x, body.y, size, size);
        })
    }

    // ヘビを動かす
    move() {
        // ヘビの先頭
        let head = this.body[this.body.length -1].copy();
        head.x += this.xDirection * size;
        head.y += this.yDirection * size;
        this.body.shift();
        this.body.push(head);
    }

    // ヘビの進む方向を変更する
    changeDirection(x, y) {
        this.xDirection = x;
        this.yDirection = y;
    }

    eat(vec) {
        let head = this.body[this.body.length -1];
        if (head.x === vec.x && head.y === vec.y) {
            this.add();
            score += 1;
            return true;
        }

        return false;
    }

    add() {
        let head = this.body[this.body.length -1].copy();
        head.x += this.xDirection * size;
        head.y += this.yDirection * size;
        this.body.push(head);
    }

    end() {
        let head = this.body[this.body.length -1].copy();
        // 枠外に出た場合
        if (head.x < 0 || head.y < 0 || head.x > width || head.y > height) {
            return true;
        }

        // 自分の体にぶつかった場合
        for (let i = 0; i < this.body.length - 1; i++) {
            if(this.body[i].x === head.x && this.body[i].y === head.y) {
                return true;
            }
        }
        return false;
    }
}

class Fruit {
        constructor () {
            let x = size * floor(random(0, width / size));
            let y = size * floor(random(0, height / size));
            this.body = createVector(x, y);
        }

        // 果物を描画する
        show () {
            fill('red');
            ellipse(this.body.x + 15 , this.body.y + 15, 30);
        }

        // 果物を動かす
        move() {
            let x = size * floor(random(0, width / size));
            let y = size * floor(random(0, height / size));
            this.body.x = x;
            this.body.y = y;
        }
}