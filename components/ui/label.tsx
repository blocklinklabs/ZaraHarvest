"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a custom label component based on Radix UI's Label primitive.
 * It provides styling for accessibility, alignment, and disabled states.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional additional CSS classes to apply.
 * @param {React.ComponentProps<typeof LabelPrimitive.Root>} props - All other props supported by Radix UI's Label.Root component.
 * @returns {JSX.Element} The rendered Label component.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
