import { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const commands = [
  {
    name: 'test',
    description: 'Send a test welcome embed for RazeRP.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, 'YOUR_GUILD_ID_HERE'),
      { body: commands }
    );
    console.log('✅ Slash command /test registered.');
  } catch (err) {
    console.error('❌ Failed to register command:', err);
  }
});

// 🟪 EMBED TEMPLATE
function buildWelcomeEmbed(member) {
  return new EmbedBuilder()
    .setColor('#9d60ff') // keeps the purple sidebar
    .setAuthor({
      name: 'Welcome to Raze Roleplay!',
    })
    .setDescription(
      `> <:AdobeExpressfile16:1430085213828026418> **<#1426933555119788063>** ┃ Make sure to read & follow all server rules\n` +
      `> <:AdobeExpressfile16:1430085213828026418> **<#1426601349486870568>** ┃ Join the chat & enjoy with the community\n` +
      `> <:AdobeExpressfile16:1430085213828026418> **<#1427470506168422410>** ┃ Stay updated with the latest announcements\n\n` +
      `Have an amazing time in **Raze City!** <:razeheart:1430228822179184700>`
    )
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/1420637479131942995/1430212437348712528/ChatGPT_Image_Oct_20_2025_02_31_44_AM.png?ex=68f8f4a1&is=68f7a321&hm=4b357160495b07e1d7f673b96e3bf316f1617617ab74df61ab6cd10584ea1d8d&'
    )
    .setImage(
      'https://media.discordapp.net/attachments/1204977692353761310/1430242138397868273/ChatGPT_Image_Oct_21_2025_09_57_10_AM.png?ex=68f9104a&is=68f7beca&hm=8fbfa095542fc6f47c0dd715ec14972f66d039ab2ab94290e98251423fd083f7&=&format=webp&quality=lossless&width=1376&height=917'
    )
    .setFooter({
      text: 'Enjoy your stay - Sincerely from Owner!',
      iconURL:
        'https://cdn.discordapp.com/attachments/1420637479131942995/1430212437348712528/ChatGPT_Image_Oct_20_2025_02_31_44_AM.png?ex=68f8f4a1&is=68f7a321&hm=4b357160495b07e1d7f673b96e3bf316f1617617ab74df61ab6cd10584ea1d8d&',
    });
}

// 🟣 AUTO-WELCOME
client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get('1426593405693067387');
  if (!channel) return;

  const embed = buildWelcomeEmbed(member);
  await channel.send({
    content: `**Hello ${member}!**`,
    embeds: [embed],
  });
});

// 🧪 TEST COMMAND
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'test') {
    try {
      await interaction.reply({ content: '🧪 Sending test embed...', ephemeral: true });
      const embed = buildWelcomeEmbed(interaction.user);
      await interaction.channel.send({
        content: `<:razewave:1430229262941814997> **Hello ${interaction.user}!**`,
        embeds: [embed],
      });
      await interaction.editReply({ content: '✅ Test embed sent successfully!' });
    } catch (err) {
      console.error('⚠️ /test error:', err);
      if (interaction.replied)
        await interaction.editReply({ content: '❌ Failed to send test embed.' });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

import express from "express";
const app = express();


app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("Server is online."));
