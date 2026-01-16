import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-black text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-0 active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_0_black]",
  {
    variants: {
      variant: {
        default: "bg-primary text-black shadow-[4px_4px_0_0_black] hover:bg-primary/90 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black]",
        destructive:
          "bg-destructive text-white shadow-[4px_4px_0_0_black] hover:bg-destructive/90 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black]",
        outline:
          "bg-background text-black shadow-[4px_4px_0_0_black] hover:bg-accent hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black]",
        secondary:
          "bg-secondary text-black shadow-[4px_4px_0_0_black] hover:bg-secondary/80 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black]",
        ghost:
          "border-transparent hover:bg-accent hover:text-black",
        link: "text-primary underline-offset-4 hover:underline border-none shadow-none",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
