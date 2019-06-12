// Docs
// https://github.com/custom-select/custom-select
import _Select from "custom-select";

const _options = {
  containerClass: "b-select",
  openerClass: "b-select__opener",
  panelClass: "b-select__panel",
  optionClass: "b-select__option",
  optgroupClass: "b-select__optgroup",
  isSelectedClass: "b-select--isSelected",
  hasFocusClass: "b-select--hasFocus",
  isDisabledClass: "b-select--isDisabled",
  isOpenClass: "b-select--isOpen"
};

const Select = function(element, options = {}) {
  options = Object.assign({}, _options, options);
  return _Select(element, options);
};

export default Select;
