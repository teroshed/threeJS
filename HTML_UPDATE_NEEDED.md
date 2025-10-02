# HTML Updates Needed

## Add Rotation Toggle Checkboxes

### For Click Snake (around line 400):

**BEFORE:**
```html
<div class="control-group">
  <div class="control-label">
    <span>Rotation Speed</span>
    <span class="control-value" id="snakeRotationSpeedValue">--</span>
  </div>
  <input type="range" id="snakeRotationSpeed">
</div>
```

**REPLACE WITH:**
```html
<div class="control-group">
  <div class="checkbox-wrapper">
    <input type="checkbox" id="snakeRotationEnabled" checked>
    <label for="snakeRotationEnabled">Enable Rotation</label>
  </div>
</div>

<div class="control-group" id="snakeRotationSliderGroup">
  <div class="control-label">
    <span>Rotation Speed</span>
    <span class="control-value" id="snakeRotationSpeedValue">--</span>
  </div>
  <input type="range" id="snakeRotationSpeed">
</div>
```

### For Random Cubes (around line 506):

**BEFORE:**
```html
<div class="control-group">
  <div class="control-label">
    <span>Rotation Speed</span>
    <span class="control-value" id="rcRotationSpeedValue">--</span>
  </div>
  <input type="range" id="rcRotationSpeed">
</div>
```

**REPLACE WITH:**
```html
<div class="control-group">
  <div class="checkbox-wrapper">
    <input type="checkbox" id="rcRotationEnabled" checked>
    <label for="rcRotationEnabled">Enable Rotation</label>
  </div>
</div>

<div class="control-group" id="rcRotationSliderGroup">
  <div class="control-label">
    <span>Rotation Speed</span>
    <span class="control-value" id="rcRotationSpeedValue">--</span>
  </div>
  <input type="range" id="rcRotationSpeed">
</div>
```

## Result:
- Checkbox toggles rotation on/off
- Slider group has ID for show/hide
- JavaScript handles visibility automatically

