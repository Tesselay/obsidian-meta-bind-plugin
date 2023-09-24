---
slider1: 23
slider2: 13
slider3: 319
---

### Simple Slider
```meta-bind
INPUT[slider(showcase):slider1]
```

### Slider with Labels
```meta-bind
INPUT[slider(addLabels, showcase):slider1]
```

### Slider with custom min max values
```meta-bind
INPUT[slider(addLabels, minValue(-20), maxValue(20), showcase):slider2]
```

```meta-bind
INPUT[slider(addLabels, minValue(0), maxValue(1000), showcase):slider3]
```