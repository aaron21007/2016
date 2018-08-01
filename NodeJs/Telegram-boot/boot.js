const TelegramBot = require('node-telegram-bot-api');
const osutils = require('os-utils');
const si = require('systeminformation');

const server = process.argv[2]

// replace the value below with the Telegram token you receive from @BotFather
const token = '653526806:AAH4WRds7_mmC1a_5P9_CR31HIE7kI53HaA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

// Matches "/echo [whatever]"
bot.onText(/\/server domer/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  Data()
  async function Data() {
    try {
      let data_cpu = await si.cpu();
      let data_osInfo = await si.osInfo();
      let data_filesize = await si.fsSize();
      let data_network = await si.networkInterfaces();
      let data_docker = await si.dockerContainers();
      let data_process = await si.processes();
      
      console.log(data_cpu)
      console.log(data_osInfo);
      console.log(data_filesize);
      console.log(data_network);
      console.log(data_docker);
      console.log(data_process);
      
      
      
      
      
      bot.sendMessage(chatId, `
                              Server ${server}
                              Platform:          ${osutils.platform()}
                              Number of CPUs:    ${osutils.cpuCount()}
                              Total Memory:      ${osutils.totalmem()} MB
                              Free Memory:       ${osutils.freemem()} MB
                              System Uptime:     ${osutils.sysUptime()} ms
                              Fecha del server:  ${data_cpu.manufacturer}`);
    } catch (e) {
      
      console.log(e)
    }
  }
});