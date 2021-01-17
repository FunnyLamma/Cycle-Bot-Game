import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { brackets, pluralb, commanum, hidden, Database } from "../../global";
import { items } from "./item";

const code: DropItem[] = [{
  chance: () => Math.random() < 0.05,
  award: user => {
    let text = new Big(user.text);
    let tpc = new Big(user.tpc);
    let boost = Math.floor(Math.random() * 2);
    let amount = tpc.times(boost).dp(0);
    text = text.plus(amount);
    user.text = text.toString();
    return { name: "Code Burst!", value: `You get an extra burst of energy!
+${brackets(commanum(amount.toString()))} line${pluralb(amount)} of code! (+${boost * 100}%)` };
  }
}, {
  chance: () => Math.random() < 0.01,
  award: user => {
    let cycles = new Big(user.cycles);
    cycles = cycles.plus(5);
    return { name: "Question Answerer!", value: `You answered somebody's question!
You earned ${brackets('5')} cycles!` };
  }
}, {
  chance: () => Math.random() < 1,//0.1,
  award: user => {
    let itemsGot = []; 

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (Math.random() * 100 < item.dropChance) {
        itemsGot.push(i);
      }
    }

    let itemText = itemsGot.map(i => hidden(items[i].name));

    return { name: "Mystery Chest!", value: `You accidentally make a ${brackets("chest")}!
You open it up and find...
${itemText.join("\n")}` };
  }
}];

// ----

const post: DropItem[] = [{
  chance: () => Math.random() < 0.05,
  award: user => {
    let text = new Big(user.text);
    let tpc = new Big(user.tpc);
    let boost = Math.floor(Math.random() * 1);
    let amount = tpc.times(boost).dp(0);
    text = text.plus(amount);
    user.text = text.toString();
    return { name: "User Suggestions", value: `People give you suggestions, and you write ${brackets(commanum(amount.toString()))} line${pluralb(amount)} of code!` };
  }
}];

export interface DropItem {
  chance: () => boolean;
  award: (_: Database.CycleUser) => Discord.EmbedFieldData
};

export { code, post };