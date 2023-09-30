interface AlignDecoratorProps {
    children: React.ReactNode
}
export const AlignDecorator: React.FC<AlignDecoratorProps> = ({ children }: AlignDecoratorProps) => {
    return(<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        {children}
    </div>)
}
