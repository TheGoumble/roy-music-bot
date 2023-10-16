const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Show the trash song being played currently"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue)
      return await interaction.editReply("Thank god there is no more songs")

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    })

    const song = queue.current

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Currently Playing this poop -> [${song.title}](${song.url})\n\n` +
              bar
          ),
      ],
    })
  },
}
