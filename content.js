let globalPassword = "";
let sites = {};
let isUnlocked = false; // বর্তমান সেশনের জন্য আনলকড কি না

chrome.storage.local.get(["globalPassword", "sites"], (data) => {
    globalPassword = data.globalPassword || "";
    sites = data.sites || {};

    isUnlocked = sessionStorage.getItem("isUnlocked_" + location.hostname);

    if (!isUnlocked) {
        checkSite();
    } else {
        startInactivityTimer();
    }
});

function checkSite() {
    for (let site in sites) {
        if (location.href.includes(site)) {
            lockScreen(site, sites[site]);
            break;
        }
    }
}

function lockScreen(site, sitePassword) {
    document.documentElement.innerHTML = `
    <body style="background:#1a1a2e; color:white; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; font-family:sans-serif;">
        <div style="text-align:center; padding:30px; background:#16213e; border-radius:15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <h1 style="font-size:40px; margin-bottom:10px;">Locked</h1>
            <p style="color:#00d2ff; margin-bottom:20px;">${site}</p>
            <input id="pass" type="password" placeholder="Enter password" style="padding:12px; border-radius:5px; border:none; outline:none; width:200px;"/>
            <button id="btn" style="padding:12px 20px; background:#00d2ff; border:none; border-radius:5px; cursor:pointer; font-weight:bold; margin-left:10px;">Unlock</button>
            <p id="msg" style="color:#ff4d4d; margin-top:10px; min-height:20px;"></p>
        </div>
    </body>
    `;

    document.getElementById("btn").onclick = () => {
        const input = document.getElementById("pass").value;

        if (input === sitePassword || input === globalPassword) {
            sessionStorage.setItem("isUnlocked_" + location.hostname, "true");
            location.reload(); 
        } else {
            document.getElementById("msg").innerText = "Wrong password!";
        }
    };
}

let timeout;
const THIRTY_MINUTES = 30 * 60 * 1000; 

function startInactivityTimer() {
    function resetTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(autoLock, THIRTY_MINUTES);
    }

    function autoLock() {
        sessionStorage.removeItem("isUnlocked_" + location.hostname);
        alert("Session expired due to inactivity. Locking site...");
        location.reload();
    }

    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.onkeypress = resetTimer;
    window.onscroll = resetTimer;

    resetTimer(); 
}