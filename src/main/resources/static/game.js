let board = [];

let moves = 0;
let seconds = 0;

let timer = null;
let gameStarted = false;

const solved = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 0
];


// =========================
// ログイン
// =========================

async function login() {

    try {

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const response =
            await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

        const data = await response.json();

        document.getElementById("authMessage")
            .textContent = data.message || "";

        if (data.success) {

            document.getElementById("currentUser")
                .textContent = data.username;

            document.getElementById("auth")
                .classList.add("hidden");

            document.getElementById("game")
                .classList.remove("hidden");

            await loadRanking();
        }

    } catch (error) {

        console.error(error);

        document.getElementById("authMessage")
            .textContent =
            "ログインに失敗しました";
    }
}


// =========================
// 新規登録
// =========================

async function register() {

    try {

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const response =
            await fetch("/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

        const data = await response.json();

        document.getElementById("authMessage")
            .textContent = data.message || "";

    } catch (error) {

        console.error(error);

        document.getElementById("authMessage")
            .textContent =
            "登録に失敗しました";
    }
}


// =========================
// ログアウト
// =========================

async function logout() {

    try {

        await fetch("/api/auth/logout", {
            method: "POST"
        });

    } catch (error) {

        console.error(error);
    }

    location.reload();
}


// =========================
// ゲーム開始
// =========================

function startGame() {

    // 前のタイマーを停止
    clearInterval(timer);

    // 完成状態から開始
    board = [...solved];

    moves = 0;
    seconds = 0;

    gameStarted = true;

    document.getElementById("moves")
        .textContent = moves;

    document.getElementById("timer")
        .textContent = seconds;

    document.getElementById("gameMessage")
        .textContent = "";

    // =========================
    // 本番用シャッフル
    // =========================
    //
    // 完成状態から実際に空白を動かして
    // 100回シャッフルする。
    //
    // 完成状態からの移動なので、
    // 必ず解ける盤面になる。
    //
    for (let i = 0; i < 100; i++) {
        randomMove();
    }

    // 万が一完成状態になった場合は
    // もう一度シャッフル
    if (isSolved()) {

        for (let i = 0; i < 20; i++) {
            randomMove();
        }
    }

    renderBoard();

    // タイマー開始
    timer = setInterval(() => {

        seconds++;

        document.getElementById("timer")
            .textContent = seconds;

    }, 1000);
}


// =========================
// ランダム移動
// =========================

function randomMove() {

    const emptyIndex =
        board.indexOf(0);

    const possible =
        getPossibleMoves(emptyIndex);

    const random =
        possible[
            Math.floor(
                Math.random() * possible.length
            )
        ];

    [
        board[emptyIndex],
        board[random]
    ] = [
        board[random],
        board[emptyIndex]
    ];
}


// =========================
// 移動可能な場所
// =========================

function getPossibleMoves(index) {

    const row =
        Math.floor(index / 3);

    const col =
        index % 3;

    const result = [];

    // 上
    if (row > 0) {
        result.push(index - 3);
    }

    // 下
    if (row < 2) {
        result.push(index + 3);
    }

    // 左
    if (col > 0) {
        result.push(index - 1);
    }

    // 右
    if (col < 2) {
        result.push(index + 1);
    }

    return result;
}


// =========================
// ボード表示
// =========================

function renderBoard() {

    const boardElement =
        document.getElementById("board");

    boardElement.innerHTML = "";

    board.forEach((number, index) => {

        const tile =
            document.createElement("div");

        tile.classList.add("tile");

        if (number === 0) {

            tile.classList.add("empty");

        } else {

            tile.textContent = number;

            tile.addEventListener(
                "click",
                () => moveTile(index)
            );
        }

        boardElement.appendChild(tile);
    });
}


// =========================
// タイル移動
// =========================

function moveTile(index) {

    if (!gameStarted) {
        return;
    }

    const emptyIndex =
        board.indexOf(0);

    const possible =
        getPossibleMoves(emptyIndex);

    // 空白の隣ではない場合
    if (!possible.includes(index)) {
        return;
    }

    // タイルと空白を交換
    [
        board[index],
        board[emptyIndex]
    ] = [
        board[emptyIndex],
        board[index]
    ];

    moves++;

    document.getElementById("moves")
        .textContent = moves;

    renderBoard();

    // クリア判定
    if (isSolved()) {

        finishGame();
    }
}


// =========================
// クリア判定
// =========================

function isSolved() {

    return board.every(
        (value, index) =>
            value === solved[index]
    );
}


// =========================
// ゲーム終了
// =========================

async function finishGame() {

    gameStarted = false;

    clearInterval(timer);

    document.getElementById("gameMessage")
        .textContent =
        `🎉 クリア！ ${seconds}秒 / ${moves}手`;

    // スコア保存
    await saveScore();

    // ランキング更新
    await loadRanking();
}


// =========================
// スコア保存
// =========================

async function saveScore() {

    try {

        const response =
            await fetch("/api/score", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    timeSeconds: seconds,
                    moves: moves
                })
            });

        if (!response.ok) {

            console.error(
                "スコア保存失敗:",
                response.status
            );

            return;
        }

        const data =
            await response.json();

        console.log(
            "スコア保存成功:",
            data
        );

    } catch (error) {

        console.error(
            "スコア保存エラー:",
            error
        );
    }
}


// =========================
// ランキング
// =========================

async function loadRanking() {

    try {

        const response =
            await fetch("/api/scores");

        if (!response.ok) {

            console.error(
                "ランキング取得失敗:",
                response.status
            );

            return;
        }

        const scores =
            await response.json();

        const ranking =
            document.getElementById("ranking");

        ranking.innerHTML = "";

        scores.forEach(
            (score, index) => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${score.username}</td>
                    <td>${score.timeSeconds}秒</td>
                    <td>${score.moves}手</td>
                `;

                ranking.appendChild(row);
            }
        );

    } catch (error) {

        console.error(
            "ランキング取得エラー:",
            error
        );
    }
}