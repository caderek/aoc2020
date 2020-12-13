# AoC 2020 day 13

Used [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem),
explanation below.

The key to solving the second part in a non-brute-force way was to notice that the bus numbers were **prime numbers**. It's not strictly required for this method to work, they have to be at least coprime, but I believe they are all prime numbers (at least my input was).

The second thing to notice was that the required departure differences can be transformed into remainders, for example:

```
- BUS: 7  | DELAY: 0  | REMAINDER: 0
- BUS: 13 | DELAY: 2  | REMAINDER: 13 - 2 = 11

Tricky case not to be found in the examples (delay longer than interval):
- BUS: 19 | DELAY: 50 | REMAINDER: 19 - (50 % 19) = 7
```

The third thing to notice was that the numbers can get really big, so the usual int type will not work here. Even JS/TS `number` type was too small (even though the result is below MAX_SAFE_INTEGER, the intermediate parts of the calculation can exceed it). `BigInt` for the rescue!

The fourth thing is connecting the dots that our `x` (timestamp) can be described as (using the previous example):

```
x mod 7 = 0
x mod 13 = 11
x mod 19 = 7
```

Which is pretty much exactly what CRT is for. Here are the steps to find the `x` (getting the essence of CRT):

1. For each **bus number** (modulus) and its **remainder**:

   1.1. Multiply all bus numbers **except** the current one

   1.2. From the [extended Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm#Extended_Euclidean_algorithm) extract the required parameter. In practice you should be able to use the extended GCD (greatest common divisor) function - you can find it in bigint crypto libraries, you can also implement it yourself quite trivially ([my code](https://github.com/caderek/aoc2020/blob/main/src/day13/index.ts#L3)). Here's how to use it:

   ```js
   firstNumber = /* value from 1.1 */;
   secondNumber = /* bus number */;

   result = eGCD(firstNumber, secondNumber)

   // returns:
   //         [gcd, intForTheFirstNumber, intForTheSecondNumber]
   //               --------------------
   //                        ↑
   //                   we want this
   ```

   The return value can have a different form but the important thing is to get the value corresponding to the `1.1` input.

   1.3. Multiply: `remainder * [result from 1.1] * [result from 1.2]`

2. Sum the results of `1.3` for all buses.

3. Multiply all **bus numbers** (this time without exceptions).

4. Calculate the modulo of **pt. 2** and **pt. 3**. WARNING: In JS/TS the `%` is not the modulo operator, just the remainder operator. To get the actual modulo, you have to add the modulus to the result if the result is lower than 0 (see: [mod](https://github.com/caderek/aoc2020/blob/main/src/day13/index.ts#L26)). That's it - that's our `x`!
