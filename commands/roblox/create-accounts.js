const Discord = require("discord.js");
const { exec } = require("child_process");
const path = require("path");

// Função para limpar o nome de usuário do Discord
function cleanDiscordUsername(username) {
  return username.replace(/[^\w\s]/gi, "").trim(); // Remove caracteres especiais e espaços
}

// Função para gerar um nome de usuário a partir do nome do Discord e do ID
function generateUsernameFromDiscord(discordUsername, id) {
  const cleanedUsername = cleanDiscordUsername(discordUsername);
  const userIDPrefix = id.slice(0, 2); // Obtém os primeiros 4 dígitos do ID do usuário no Discord

  let username = `${cleanedUsername}${userIDPrefix}`;
  username = `${cleanedUsername.slice(0, 5 - 5)}${userIDPrefix}`;

  return username;
}

// Função para gerar uma senha forte
function generateStrongPassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

module.exports = {
  name: "create-accounts",
  description: "Cria uma conta no Roblox com um nome de usuário e senha forte!",

  run: async (client, interaction) => {
    interaction
      .reply({
        content: `<:13:1135655423349891162> Developer: ronieremarques\n<a:1078121335605166120:1135653173583941783> Creating of account, please wait...\n`,
        ephemeral: true,
      })
      .then(async (success) => {
        // ✅ Creating of accounts with python

        // Obtém o nome de usuário limpo e o ID do autor da interação no Discord
        const discordUsername = interaction.user.username;
        const userID = interaction.user.id;

        // Gera um nome de usuário no formato "usuario_ID_data_hora"
        const currentDate = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, ""); // Obtém a data e hora atual no formato "yyyyMMddhhmmss"
        const username = generateUsernameFromDiscord(discordUsername, userID);
        const uniqueUsername = `${username}_${currentDate}`;

        // Gera uma senha forte com 16 caracteres
        const password = generateStrongPassword(16);

        const pythonScriptPath = path.join(__dirname, "creating.py");

        // Cria uma string com o ID do usuário para enviar ao script Python
        const userIDString = userID.slice(0, 4); // Obtém os primeiros 4 dígitos do ID

        // Executa o script Python e envia o nome de usuário, senha e o ID como entrada padrão (stdin)
        const pythonProcess = exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro na execução do script Python: ${error.message}`);
            interaction.editReply({
              content: `❌ Ocorreu um erro durante a criação da conta.`,
              ephemeral: true,
            });
            return;
          }

          // Processar a saída (stdout) do script Python, se necessário
          console.log(stdout);

          // Enviar resposta ao usuário no Discord
          interaction.editReply({
            content: `✅ A conta no Roblox foi criada com sucesso!\nNome de Usuário: ${uniqueUsername}\nSenha: ${password}`,
            ephemeral: true,
          });
        });

        // Envia o nome de usuário, senha e o ID para o script Python através de stdin
        pythonProcess.stdin.write(uniqueUsername + "\n" + password + "\n" + userIDString + "\n");
        pythonProcess.stdin.end();
      })
      .catch((err) => {
        // ❌ Failed of creating accounts
        console.log(err);
        interaction.reply({
          content: `❌ Ocorreu um erro: \`\`\`${err}\`\`\``,
          ephemeral: true,
        });
      });
  },
};
