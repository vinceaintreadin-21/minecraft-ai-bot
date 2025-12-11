import { world } from "@minecraft/server";
import { http } from "@minecraft/server-net";

world.afterEvents.chat.subscribe(ev => {
    const player = ev.sender;
    const message = ev.message;

    // Send message to Laravel backend
    http.request({
        method: "POST",
        url: "http://localhost:8000/api/ai/message",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            player: player.name,
            message: message
        })
    }).then(res => {
        const data = JSON.parse(res.body);

        // Display AI reply
        player.sendMessage(`§a[AI Bot]: §r${data.reply}`);
    }).catch(error => {
        player.sendMessage(`§c[AI Bot Error]: Could not reach backend`);
    });
});
