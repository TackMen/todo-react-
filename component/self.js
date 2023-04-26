
// 呼び出し
async function callAPI() {
    const res = await fetch("http://localhost:3001/todos");
    const users = await res.json();
    console.log(users);

// リスト追加
users.array.forEach(function(user) {
    console.log(user);
});
    const list = document.createElement("li");
    list.innerText = ""
    lists.appendChild(list);
};

