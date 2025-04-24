'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define the structure for combobox items
export interface ComboboxItem {
  value: string;
  label: string;
}

// Define the props for the reusable Combobox component
export interface ComboboxProps {
  items: ComboboxItem[];
  value?: string; // Controlled value
  onValueChange: (value: string) => void; // Handler for value change
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
  buttonClassName?: string;
  popoverClassName?: string;
}

export function Combobox({
  items,
  value = "", // Default to empty string if uncontrolled
  onValueChange,
  placeholder = "Select an item...",
  searchPlaceholder = "Search items...",
  notFoundMessage = "No item found.",
  buttonClassName,
  popoverClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", buttonClassName)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", popoverClassName)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          {/* Using CommandList is important for scrollable lists */}
          <CommandList>
            <CommandEmpty>{notFoundMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value} // Use item.value for CommandItem value
                  onSelect={(currentValue) => {
                    // Check if the selected value is the same as the current value
                    const newValue = currentValue === value ? "" : currentValue;
                    onValueChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 