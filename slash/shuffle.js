const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Hopefully makes the bad song last of queue"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue)
      return await interaction.editReply("Thank god there is no more songs")

    queue.destroy()
    await interaction.editReply(
      `All ${queue.tracks.lenght} have been shuffled!`
    )
  },
}
