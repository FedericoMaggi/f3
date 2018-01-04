# F3 - F For Format

**F For Format** is a simple, very fast, super scalable and ultra lightweight solution for string formatting in JavaScript.

It features the latest ES6 technologies to provide you a reliable implementation of what is featured in most languages but not in JavaScript.


## How does it work

Simple, just include it in your project and use it as:

```js
f3.sprintf('My amazing string has the number %d and its name is %s', 42, 'Bob');
```

## Integration guide
F3 works both in your browser and as a Node.js package. Just include it with the `<script>` tag or by using `require()`. Nothing can stop you at this point.

## What format pattern does it support?
We have plenty of them, use:
* `%s` for strings;
* `%d` for numbers;
* `%f` for floats;
* `%j` for objects;
* `%a` for arrays.

Is any of these one truly needed? Nay... Since JS is typeless and has no typechecking most of them are just simple string conversions. They get interesting when you need to include Objects and Array representations in your strings though. Hence keep in mind what format patterns you use and what you pass as a parameter.

## Contributing
You want to contribute to this magnificent project? That's great, file an issue and we can talk about it. :)

## YEAH, BUT WHY?

Because I **F*****ing hate string concatenation, that's why! <3
The actual reason is that this is a kind of joke-project I always wanted to work on and finally did.
