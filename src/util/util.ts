import { BigNumber as Big } from "bignumber.js";

function randomChoice<T>(array: T[], amount = 1): T[] {
  let out = [];
  for (let i = 0; i < amount; i++) {
    out.push(array[Math.floor(array.length * Math.random())]);
  }

  return out;
}

function random(min: number, max: number): number {
  return (max - min) * Math.random() + min;
}

function randomb(min: Big, max: Big): Big {
  return (max.minus(min)).times(Math.random()).plus(min);
}

/** Adds Commas */
function commanum(inp: string) {
  let val = inp.replace(/,/g, "");
  let valSplit = val.split('.');

  while (/(\d+)(\d{3})/.test(valSplit[0].toString())) valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, "$1,$2");

  return valSplit.length == 2 ? valSplit[0] + "." + valSplit[1] : valSplit[0];
}

/** Turns 1e+3 to 1000 */
function expandnum(val: string) {
  let data = val.split(/[eE]/);
  if (data.length == 1) return data[0];

  let z = "";
  let sign = Number(val) < 0 ? '-' : "";
  let str = data[0].replace('.', "");
  let mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += '0';
    return z + str.replace(/^\-/, "");
  }

  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}

function plural(amount: number, singular = "", plural = "s") {
  return amount == 1 ? singular : plural;
}

function pluralb(amount: Big, singular = "", plural = "s") {
  return amount.eq(1) ? singular : plural;
}

function parseMention(input: string): { type: "name" | "id", value: string } {
  if (/^<@!?(\d+)>$/.test(input)) return { type: "id", value: input.match(/^<@!?(\d+)>$/)![1] };
  if (/^\d+$/.test(input)) return { type: "id", value: input };
  return { type: "name", value: input };
}

function msBetween(start: Date, end: Date) {
  return end.getTime() - start.getTime();
}

function addMs(start: Date, ms: number) {
  return new Date(start.getTime() + ms);
}

/**
 * How much 'n' amout costs.
 */
function calcCost(base: Big, inflation: number, amount: number, owned: number) {
  let binfl = new Big(inflation);
  return base.times((binfl.pow(amount).minus(1)).times(binfl.pow(owned)).div(binfl.minus(1))).dp(0);
}

/**
 * How much one thing costs
 */
function calcPrice(base: Big, inflation: number, owned: number) {
  return calcCost(base, inflation, 1, owned);
}

/**
 * parses commas as well.
 * @param num the number
 */
function parseNumber(num = "") {
  let n = num.trim().replace(/[^\d.]/g, "")
  return n == "" ? NaN : Number(n);
}

function constrain(n: number, min: number, max: number) { return n < min ? min : n > max ? max : n; }

export { randomChoice, random, randomb, commanum, expandnum, plural, pluralb, parseMention, msBetween, addMs, calcCost, calcPrice, parseNumber, constrain };