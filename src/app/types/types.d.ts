declare module '*.module.scss' {
    const classes: Record<string, string>
    export default classes
}

declare module '*.png' {
    const classes: string
    export default classes
}

declare module '*.svg' {
    const classes: string
    export default classes
}
