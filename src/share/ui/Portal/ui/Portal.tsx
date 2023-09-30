import { createPortal } from 'react-dom'
import type React from 'react'
import { ReactNode } from 'react'

interface PortalProps {
    parent: Element
    children: React.ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children, parent }: PortalProps) => {
    return (<>
        {
            createPortal(children, parent)
        }
    </>)
}
