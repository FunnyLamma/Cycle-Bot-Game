import * as Discord from "discord.js";
import * as g from "../../global";

class C extends g.Command {
  names = ["invite"];
  help = "";

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("please use &version.")
  }
}

export default new C();