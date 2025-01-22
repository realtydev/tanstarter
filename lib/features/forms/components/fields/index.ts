import { registerWidget } from '../../utils/registry'
import { TextField } from './TextField'
import { SelectField } from './SelectField'
import { SwitchField } from './SwitchField'
import { ArrayField } from './ArrayField'

// Register all field components
registerWidget('text', TextField)
registerWidget('select', SelectField)
registerWidget('switch', SwitchField)
registerWidget('array', ArrayField)

// Export for direct usage if needed
export {
  TextField,
  SelectField,
  SwitchField,
  ArrayField
}