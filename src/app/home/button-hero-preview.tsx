'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

function ButtonHeroPreview() {
    return (
        <Button
            onClick={() => {
                document.getElementById("preview")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }}
            size="lg" variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent" >
            Ver Preview
        </Button>
    )
}

export default ButtonHeroPreview