# Export shader

Assign shader to a variable, and then replace `.out()` with `.glsl()`

```jsx
const speed = 0.08

shader = osc(100, speed, 150)
  .modulate(noise(5, speed))
  .layer(osc(100, speed, 150))
  .modulate(noise(3, speed).mask(shape(4, 0.3, 0.3)))
  .luma(0.2)
  .glsl()

console.log(shader[0])
```

Add to variable → call `glsl()` → and get `shader[<output screen number>].frag` eg `shader[0].frag`
