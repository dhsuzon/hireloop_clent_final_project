import {
  TextField,
  Select,
  ListBox,
  Label,
  InputGroup,
  FieldError,
} from "@heroui/react";
import ChevronDown from "@gravity-ui/icons/ChevronDown";

export const SelectField = ({
  name,
  label,
  placeholder,
  items,
  defaultSelectedKey,
  isRequired,
  icon: Icon,
}) => (
  <Select
    name={name}
    placeholder={placeholder}
    defaultSelectedKey={defaultSelectedKey}
    isRequired={isRequired}
    validationBehavior="aria"
    className="flex flex-col gap-1.5"
  >
    <Label aria-label={label}>{label}</Label>
    <Select.Trigger className="items-center gap-2">
      {Icon ? <Icon className="size-4 shrink-0 text-muted" /> : null}
      <Select.Value className="flex-1 text-left" />
      <Select.Indicator>
        <ChevronDown className="size-4 text-muted" />
      </Select.Indicator>
    </Select.Trigger>
    <Select.Popover>
      <ListBox>
        {items.map((item) => (
          <ListBox.Item key={item} id={item} textValue={item}>
            {item}
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
    <FieldError />
  </Select>
);

export const TextInputField = ({
  name,
  label,
  placeholder,
  icon: Icon,
  type,
  inputMode,
  isRequired,
  isDisabled,
}) => (
  <TextField
    name={name}
    isRequired={isRequired}
    isDisabled={isDisabled}
    validationBehavior="aria"
    className="flex flex-col gap-1.5"
  >
    <Label>{label}</Label>
    <InputGroup>
      {Icon ? (
        <InputGroup.Prefix className="border-r-0 pe-2">
          <Icon className="size-4 text-muted" />
        </InputGroup.Prefix>
      ) : null}
      <InputGroup.Input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
      />
    </InputGroup>
    <FieldError />
  </TextField>
);

export const TextAreaField = ({
  name,
  label,
  placeholder,
  icon: Icon,
  rows = 4,
  isRequired,
  optional,
}) => (
  <TextField
    name={name}
    isRequired={isRequired}
    validationBehavior="aria"
    className="flex flex-col gap-1.5"
  >
    <Label>
      {label}
      {optional ? (
        <span className="ml-1 font-normal text-muted">(optional)</span>
      ) : null}
    </Label>
    <InputGroup>
      {Icon ? (
        <InputGroup.Prefix className="border-r-0 pe-2">
          <Icon className="size-4 text-muted" />
        </InputGroup.Prefix>
      ) : null}
      <InputGroup.TextArea rows={rows} placeholder={placeholder} />
    </InputGroup>
    <FieldError />
  </TextField>
);
