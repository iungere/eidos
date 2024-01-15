import { useEffect, useState } from "react"

import { SelectField, SelectOption } from "@/lib/fields/select"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ISelectEditorProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  isEditing: boolean
}

export const SelectEditor = ({
  value,
  onChange,
  options,
  isEditing,
}: ISelectEditorProps) => {
  const [_value, setValue] = useState<string>(value)

  useEffect(() => {
    onChange(_value)
  }, [_value, onChange])

  return (
    <Select value={_value} onValueChange={setValue}>
      <SelectTrigger
        hideSelectIcon
        className={cn("w-[180px] focus:ring-0 focus:ring-offset-0", {
          "border-none pl-0": !isEditing,
        })}
      >
        <SelectValue placeholder={_value} className="box-shadow-none" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            <span
              style={{
                background: SelectField.getColorValue(option.color),
              }}
              className="select-none rounded-sm px-2"
            >
              {option.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
