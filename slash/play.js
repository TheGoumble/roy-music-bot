const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("loads songs from youtube")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        //possible rando reply
        .setDescription("Loads a single song from a url... Smelly")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the song's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        //possible rando reply
        .setDescription("Loads a playlist of songs from a url")
        .addStringOption((option) =>
          option.setName("url").setDescription("playlist url").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        //possible rando reply
        .setDescription("Searches your smelly song")
        .addStringOption((option) =>
          option
            .setName("searchterms")
            .setDescription("keywords")
            .setRequired(true)
        )
    ),
  run: async ({ client, interaction }) => {
    if (!interaction.member.voice.channel)
      //possible rando reply
      return interaction.editReply(
        "Just blow in from stupid town? you gotta be in the server"
      )

    const queue = await client.player.createQueue(interaction.guild)
    if (!queue.connection) await queue.connect(interaction.member.voice.channel)

    let embed = new EmbedBuilder()

    if (interaction.options.getSubcommand() === "song") {
      let url = interaction.options.getString("url")
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      })
      if (result.tracks.length === 0) return interaction.editReply("No results")

      const song = result.tracks[0]
      await queue.addTrack(song)
      embed
        .setDescription(
          //possible rando reply
          `**[${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
    // } else if (interaction.options.getSubcommand() === "playlist") {
    //   let url = interaction.options.getString("url")
    //   const result = await client.player.search(url, {
    //     requestedBy: interaction.user,
    //     searchEngine: QueryType.YOUTUBE_PLAYLIST,
    //   })

    //   if (result.tracks.length === 0) return interaction.editReply("No results")

    //   const playlist = result.playlist
    //   await queue.addTracks(result.tracks)
    //   embed
    //     .setDescription(
    //       //possible rando reply
    //       `**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
    //     )
    //     .setThumbnail(playlist.thumbnail)
    } else if (interaction.options.getSubcommand() === "search") {
      let url = interaction.options.getString("searchterms")
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })

      if (result.tracks.length === 0) return interaction.editReply("No results")

      const song = result.tracks[0]
      await queue.addTrack(song)
      embed
        .setDescription(
          //possible rando reply
          `**[${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
    }
    if (!queue.playing) await queue.play()
    await interaction.editReply({
      embeds: [embed],
    })
  },
}
