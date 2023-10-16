const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to a certain trash #")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("The track to skip to")
        .setMinValue(1)
        .setRequired(true)
    ),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue)
      return await interaction.editReply("Thank god there is no more songs")

    const trackNum = interaction.options.getNumber("tracknumber")
    if (trackNum > queue.tracks.length)
      return await interaction.editReply("COPE Invalid track number")
    queue.skipTo(trackNum - 1)

    await interaction.editReply(`Skipped to track number ${trackNum}, OH BOY`)
  },
}
