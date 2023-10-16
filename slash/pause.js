const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the Trash"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue)
      return await interaction.editReply("Thank god there is no more songs")

    queue.setPaused(true)
    await interaction.editReply(
      "Music has been paused! Use `/resume` to resume the music"
    )
  },
}
