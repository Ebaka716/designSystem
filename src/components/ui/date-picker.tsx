'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react" // Renamed to avoid conflict

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define the props for the reusable DatePicker component
export interface DatePickerProps {
  date?: Date;
  onSelectDate: (date: Date | undefined) => void;
  buttonClassName?: string;
  popoverAlign?: "start" | "center" | "end";
  placeholder?: string;
}

export function DatePicker({ 
  date,
  onSelectDate,
  buttonClassName,
  popoverAlign = "start",
  placeholder = "Pick a date"
}: DatePickerProps) {
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            buttonClassName // Allow overriding button styles
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={popoverAlign}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelectDate} // Use the passed handler
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
} 