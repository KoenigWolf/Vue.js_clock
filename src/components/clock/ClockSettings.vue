<template>
  <div class="clock-settings">
    <div class="settings-group time-format">
      <label class="control-label">
        <input
          type="checkbox"
          :checked="modelValue.is24Hour"
          @change="updateSettings('is24Hour', $event.target.checked)"
        >
        24時間表示
      </label>
    </div>
    
    <div class="settings-group colors">
      <label class="control-label">
        背景色:
        <input
          type="color"
          :value="modelValue.backgroundColor"
          @input="updateSettings('backgroundColor', $event.target.value)"
        >
      </label>
      
      <label class="control-label">
        文字色:
        <input
          type="color"
          :value="modelValue.textColor"
          @input="updateSettings('textColor', $event.target.value)"
        >
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockSettings',
  
  props: {
    modelValue: {
      type: Object,
      required: true,
      validator: (value) => {
        return ['is24Hour', 'backgroundColor', 'textColor'].every(key => key in value)
      }
    }
  },

  emits: ['update:modelValue'],

  methods: {
    updateSettings(key, value) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        [key]: value
      })
    }
  }
}
</script>

<style scoped>
.clock-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.settings-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
}

input[type="color"] {
  width: 50px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>