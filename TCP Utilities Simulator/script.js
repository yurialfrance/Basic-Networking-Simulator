// Map of commands with expected outputs
const commands = {
    ping: (args) => `Pinging ${args} [142.251.220.238] with 32 bytes of data:
Reply from 142.251.220.238: bytes=32 time=4ms TTL=57
Reply from 142.251.220.238: bytes=32 time=4ms TTL=57
Reply from 142.251.220.238: bytes=32 time=4ms TTL=57
Reply from 142.251.220.238: bytes=32 time=4ms TTL=57

Ping statistics for 142.251.220.238:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 4ms, Maximum = 4ms, Average = 4ms`,
    ipconfig: () => `Windows IP Configuration

Ethernet adapter Ethernet:
    Connection-specific DNS Suffix  . : local
    IPv4 Address. . . . . . . . . . . : 192.168.1.2
    Subnet Mask . . . . . . . . . . . : 255.255.255.0
    Default Gateway . . . . . . . . . : 192.168.1.1`,
    tracert: (args) => `Tracing route to ${args} over a maximum of 30 hops:
  1     1 ms    <1 ms    <1 ms  192.168.1.1
  2    13 ms    12 ms    13 ms  10.10.10.1
  3    36 ms    35 ms    36 ms  142.251.220.238`,
    cls: () => "CLEAR",
    color: (args) => `Text color changed to ${args}`,
    hostname: () => `ASUS-PC`,
    netstat: () => `Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    192.168.1.2:12345      93.184.216.34:80       ESTABLISHED`,
    nslookup: (args) => `Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    ${args}
Address:  142.251.220.238`,
    nbtstat: () => `Local Area Connection:
Node IpAddress: [192.168.1.2] Scope Id: []

           NetBIOS Remote Machine Name Table

       Name               Type         Status
    ---------------------------------------------
    WORKGROUP      <00>  GROUP        Registered`,
    pathping: (args) => `Tracing route to ${args} over a maximum of 30 hops...
  1     <1 ms     <1 ms     <1 ms  192.168.1.1
Computing statistics for 30 seconds...
  Source to Here   This Node/Link
Hop RTT Lost/Sent= Pct  Lost/Sent= Pct  Address`,
};

// Function to update output
function updateOutput(cmd) {
    const output = document.getElementById("cmd-output");
    const input = cmd.trim().split(" ");
    const command = input[0];
    const args = input.slice(1).join(" ");
    let result;

    if (command in commands) {
        if (command === "cls") {
            output.textContent = "";
            return;
        } else if (command === "color") {
            document.body.style.color = args || "#00ff00";
            result = commands[command](args);
        } else {
            result = commands[command](args || "google.com");
        }
    } else {
        result = `'${cmd}' is not recognized as an internal or external command, operable program, or batch file.`;
    }

    output.textContent += `C:\\Users\\Asus>${cmd}\n${result}\n\n`;
    output.scrollTop = output.scrollHeight;
}

// Event listener for command input
document.getElementById("cmd-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cmd = e.target.value.trim();
        e.target.value = "";
        updateOutput(cmd);
    }
});
