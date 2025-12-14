import { world } from "@minecraft/server";
import { http } from "@minecraft/server-net";

// Use 'chatSend' event for player-originated messages
world.afterEvents.chatSend.subscribe(ev => {
    // You should also consider checking if the message is a command
    // or if it specifically addresses the AI bot (e.g., starts with '!')
    if (ev.message.startsWith('!ai ')) {
        // Only process the message if it starts with your bot's prefix
        const player = ev.sender;
        const message = ev.message.substring(4); // Remove '!ai ' prefix

        // IMPORTANT: Prevent the message from being broadcast to all players
        // before the AI has a chance to reply.
        ev.cancel = true;

        // Send message to Laravel backend
        http.request({
            method: "POST",
            url: "http://192.168.137.1:8000/api/ai/message",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player: player.name,
                message: message
            })
        }).then(res => {
            // Note: Use a try/catch block for JSON parsing as a best practice
            // in case the server returns invalid JSON.
            try {
                const data = JSON.parse(res.body);

                // Display AI reply (using world.sendMessage to ensure it's
                // visible to all players, not just the sender)
                world.sendMessage(`§a[AI Bot] §l${player.name}:§r ${data.reply}`);
            } catch (jsonError) {
                player.sendMessage(`§c[AI Bot Error]: Invalid response from backend.`);
                console.error("JSON Parse Error:", jsonError);
            }
        }).catch(error => {
            // Log the full error to the console for debugging on the BDS
            console.error("HTTP Request Error:", error);
            player.sendMessage(`§c[AI Bot Error]: Could not reach backend or network failed.`);
        });
    }
});