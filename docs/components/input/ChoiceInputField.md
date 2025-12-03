# ChoiceInputField

**Location:** `src/components/input/ChoiceInputField.tsx`

## Overview
The `ChoiceInputField` component provides a standardized interface for managing multiple option inputs. It supports dynamic lists, adding new options, rich text editing for each option, and consistent layout.

## Features
- Dynamic list of option inputs
- Add new options
- Rich text editing for each option
- Consistent spacing and layout
- Customizable labels and placeholders

## Props
- `label`: string – Field label/title
- `options`: string[] – Array of option values
- `onOptionChange`: function – Handler for option value changes
- `onAddOption`: function – Handler for adding new options
- `onFocus`: function – Focus handler
- `disabled`: boolean – Disable fields
- `placeholder`: string – Placeholder text for option inputs
- `optionLabelPrefix`: string – Label prefix for each option
- `rows`: number – Number of rows for each option input
- `addButtonText`: string – Add button text
- (plus grid wrapper props)

## Usage
```tsx
import ChoiceInputField from './input/ChoiceInputField';

<ChoiceInputField
  label="Options"
  options={optionList}
  onOptionChange={handleOptionChange}
  onAddOption={handleAddOption}
/>
```

## Best Practices
- Use for multiple choice or dynamic option fields
- Customize labels and placeholders for clarity

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
