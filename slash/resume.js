const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the Trash"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue)
      return await interaction.editReply("Thank god there is no more songs")

    queue.setPaused(false)
    await interaction.editReply(
      "Music has been paused! Use `/pause` to resume the music"
    )
  },
}
